import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
  @Input() propertyID;
  taxForm: FormGroup;
  submitted = false;
  error = '';
  isLoading = false;
  userId: number;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: GeneralService) { }
  ngOnInit() {
    this.taxForm = this.formBuilder.group({
      RevenueOffice: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      AmountDue: new FormControl('', Validators.required),
      NextDueDate: new FormControl('', Validators.required),
      LastTaxAmount: new FormControl('', Validators.required),
      LastTaxPaidDate: new FormControl('', Validators.required),
      FileName: new FormControl(null, Validators.required),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null),
      CreatedBy: new FormControl('1', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    this.service.addtax(this.propertyID, this.taxForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            return;
          } else {
            console.log(data, 'response');
            Swal.fire({
              title: 'Property Added Successfully!',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              this.router.navigate(['property']);
            });
          }
        });
    this.isLoading = false;
  }
}
