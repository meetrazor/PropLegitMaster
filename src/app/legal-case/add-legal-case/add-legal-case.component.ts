import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-legal-case',
  templateUrl: './add-legal-case.component.html',
  styleUrls: ['./add-legal-case.component.scss']
})
export class AddLegalCaseComponent implements OnInit {
  legalcaseForm: FormGroup;
  submitted = false;
  currentUser: any;
  @Input() PropertyID;
  isloading: boolean;
  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private service: GeneralService) { }

  ngOnInit() {
    this.isloading = true;
    this.currentUser = this.service.getcurrentUser();
    this.legalcaseForm = this.formBuilder.group({
      PropertyId: new FormControl(this.route.snapshot.params.id, Validators.required),
      CaseNumber: new FormControl('', Validators.required),
      CaseType: new FormControl('', Validators.required),
      CourtName: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      CourtAddress: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      CaseDescription: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      Status: new FormControl('1', Validators.required),
      Judge: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      FilingNumber: new FormControl('', Validators.required),
      FilingDate: new FormControl('', Validators.required),
      RegistrationNumber: new FormControl('', Validators.required),
      RegistrationDate: new FormControl('', Validators.required),
      CNRNumber: new FormControl('', Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required)
    });
    this.isloading = false;
  }
  isValid(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }
  get f() { return this.legalcaseForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.legalcaseForm.valid) {
      this.isloading = true;
      this.service.addLegalCase(this.route.snapshot.params.id, this.legalcaseForm.value)
        .subscribe(data => {
          this.isloading = false;
          this.submitted = false;
          this.legalcaseForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
          }
        });
    }
  }

}
