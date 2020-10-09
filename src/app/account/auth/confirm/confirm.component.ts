import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {
  userID: number;
  obj = {
    TransactionType: 'For Login',
    CreatedBy: 1
  };
  OTPform: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  router: any;
  constructor(private service: GeneralService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userID = this.service.getUserID();
    this.service.generateOTP(this.userID, this.obj).subscribe((res) => {
      console.log(res);
    });
    this.OTPform = this.formBuilder.group({
      FirstName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      StateID: ['1', Validators.required],
      CreatedBy: ['1', Validators.required],
    });
  }
  get f() { return this.OTPform.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.OTPform.invalid) {
      return;
    }

    this.loading = true;
    this.service.userRegister(this.OTPform.value).subscribe((res) => {

      this.loading = false;

      this.router.navigate(['/account/confirm']);
    });
  }
  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

}
