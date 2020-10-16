import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;

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
          if (data.error) {
            this.error = data.error;
            this.loading = false;
            return;
          } else {
            console.log(data);
            this.router.navigate([this.returnUrl]);
          }
        });
  }
}
