import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  userId: number;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: GeneralService) { }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      StateID: ['1', Validators.required],
      CreatedBy: ['1', Validators.required],
    });
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.userRegister(this.signupForm.value).subscribe((res) => {
      this.userId = res.data[0].UserID;
      this.service.setUserID(this.userId);
      this.loading = false;
      Swal.fire({
        title: 'Success',
        text: `A email has been send to ${this.signupForm.value.EmailAddress},
        and A message has been send to ${this.signupForm.value.MobileNumber} Please
        check for an email and message from company and enter OTP.`,
        type: 'success',
        confirmButtonClass: 'btn btn-confirm mt-2'
      });
      this.router.navigate(['/account/confirm']);
    });
  }
}
