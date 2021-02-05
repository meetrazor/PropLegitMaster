import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  confirmForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  success = '';
  loading = false;
  @ViewChild('OtpInput', { static: false }) OtpRef: any;
  @ViewChild('wizardForm', { static: false }) wizard: BaseWizardComponent;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: GeneralService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      EmailORMobile: ['', [Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|^([0-9]{10})+$/)]],
      // MobileNumber: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.confirmForm = this.formBuilder.group({
      OTP: ['', [Validators.required,
      Validators.pattern('[a-zA-Z0-9]{6}')]],
      // MobileNumber: ['', Validators.required],
      OTPLogID: ['', Validators.required],
    });
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get e() { return this.confirmForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data.error) {
            this.error = data.error;
            return;
          } else {
            this.submitted = false;
            this.error = '';
            this.success = data.message;
            this.e.OTPLogID.setValue(data.data.OTPLogID);
            this.wizard.navigation.goToNextStep();
          }
        });
  }
  onConfirmSubmit() {
    this.success = '';
    this.error = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.confirmForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.loginOTPVerify(this.confirmForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status === 200) {
        this.submitted = false;
        if (res.data[0].CompanyID === 2) {
          this.router.navigate(['/loan']);
        } else {
          this.router.navigate(['/AICC']);
        }
      } else {
        this.error = res.error;
      }
    });

  }
  onOtpChange(event) {
    this.e.OTP.setValue(event);
  }
}
