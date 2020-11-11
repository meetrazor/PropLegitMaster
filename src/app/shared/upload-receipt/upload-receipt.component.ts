import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-receipt-shared',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent implements OnInit {
  photographForm: FormGroup;
  file: any;
  @Input() propertyId: string;
  @Input() taxId: string;
  @Input() rentId: string;
  isLoading: boolean;
  submited: boolean;

  constructor(private generalService: GeneralService, private router: Router) {
  }

  ngOnInit() {
    this.photographForm = new FormGroup({
      FileName: new FormControl(null, Validators.required),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      PropertyID: new FormControl(this.propertyId, Validators.required),
    });
    this.submited = false;
    this.isLoading = false;
  }
  private prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('PropertyID', this.propertyId);
    input.append('uploadfile', (this.photographForm.get('uploadfile').value)[0]);

    return input;
  }
  get f() { return this.photographForm.controls; }
  onSubmit() {
    console.log(this.photographForm);
    this.submited = true;
    if (this.photographForm.valid) {
      // 1 is Property ID
      if (this.taxId && !this.rentId) {
        this.isLoading = true;
        this.generalService.uploadTaxReceipt(this.propertyId, this.taxId, this.prepareSave())
          .subscribe(data => {
            this.isLoading = false;
            this.photographForm.reset();
            if (data.status === 200) {
              this.submited = false;
              Swal.fire({
                title: 'Uploaded',
                text: data.message,
                type: 'success',
                timer: 2000
              }).then(() => {
                this.router.navigate([`/property/view/${this.propertyId}`]);
              });
            } else {
              Swal.fire({
                title: data.error_code,
                text: data.message,
                type: 'error'
              });
            }
          });
      } else if (!this.taxId && this.rentId) {
        this.isLoading = true;
        this.generalService.uploadRentReceipt(this.propertyId, this.rentId, this.prepareSave())
          .subscribe(data => {
            this.isLoading = false;
            this.photographForm.reset();
            if (data.status === 200) {
              this.submited = false;
              Swal.fire({
                title: 'Uploaded',
                text: data.message,
                type: 'success',
                timer: 2000
              }).then(() => {
                this.router.navigate([`/property/view/${this.propertyId}`]);
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
}

