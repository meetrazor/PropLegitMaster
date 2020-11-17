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
  fileExtension: string;
  constructor(private generalService: GeneralService, private router: Router) {
  }

  ngOnInit() {
    this.photographForm = new FormGroup({
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      PropertyID: new FormControl(this.propertyId, Validators.required),
    });
    this.submited = false;
    this.isLoading = false;
    this.photographForm.controls.FileType.disable();
  }
  private prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('PropertyID', this.propertyId);
    input.append('uploadfile', (this.photographForm.get('uploadfile').value)[0]);

    return input;
  }
  get f() { return this.photographForm.controls; }
  onSubmit() {
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
  onchange(e) {
    if (e && e.length > 0) {
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.photographForm.controls.FileType.setValue('');
      this.photographForm.controls.FileName.setValue('');
      this.photographForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if (filetype.toLowerCase() === 'video/mp4' && extension.toLowerCase() === 'mp4') {
      this.photographForm.controls.FileType.setValue('Video');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'audio/vnd.dlna.adts' && extension.toLowerCase() === 'aac') ||
      (filetype.toLowerCase() === 'audio/mpeg' && extension.toLowerCase() === 'mp3')) {
      this.photographForm.controls.FileType.setValue('Audio');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.photographForm.controls.FileType.setValue('Photo');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.photographForm.controls.FileType.setValue('PDF');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/msword' && extension.toLowerCase() === 'doc') ||
      (filetype.toLowerCase() === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        extension.toLowerCase() === 'docx')) {
      this.photographForm.controls.FileType.setValue('DOC');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.photographForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
}

