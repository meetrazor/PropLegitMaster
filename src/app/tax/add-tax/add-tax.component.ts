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
  maxDate: Date;
  fileExtension: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: GeneralService) { }
  ngOnInit() {
    this.maxDate = new Date();
    this.taxForm = this.formBuilder.group({
      RevenueOffice: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      AmountDue: new FormControl('', [Validators.required, Validators.min(1)]),
      NextDueDate: new FormControl('', Validators.required),
      LastTaxAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      LastTaxPaidDate: new FormControl('', Validators.required),
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl(null, Validators.required,),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl('1', Validators.required),
      PropertyID: new FormControl(this.propertyID),
    });
    this.taxForm.controls.FileType.disable();
  }
  prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.taxForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.taxForm.get('FileType').value);
    input.append('Description', this.taxForm.get('Description').value);
    input.append('uploadfile', (this.taxForm.get('uploadfile').value)[0]);
    input.append('RevenueOffice', (this.taxForm.get('RevenueOffice').value));
    input.append('AmountDue', (this.taxForm.get('AmountDue').value));
    input.append('NextDueDate', (this.taxForm.get('NextDueDate').value));
    input.append('LastTaxAmount', (this.taxForm.get('LastTaxAmount').value));
    input.append('CreatedBy', (this.taxForm.get('CreatedBy').value));
    input.append('LastTaxPaidDate', (this.taxForm.get('LastTaxPaidDate').value));
    input.append('PropertyID', (this.taxForm.get('PropertyID').value));

    return input;
  }
  get f() { return this.taxForm.controls; }

  valid(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      return false;
    }
    if (e.target.value.length > 7) {
      if (e.keyCode != 8) {
        return false;
      }
    }
  }

  callback() {
    return false;
  }

  onSubmit() {
    // console.log(this.taxForm.value.uploadfile[0]);
    // return;
    this.submitted = true;
    this.isLoading = true;
    if (this.taxForm.valid) {
      this.service.addtax(this.propertyID, this.prepareSave())
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
              Swal.fire({
                title: 'Tax Added Successfully!',
                text: data.message,
                type: 'success',
                timer: 2000
              }).then(() => {
                location.reload();
              });
            }
          });
    }
    this.isLoading = false;
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
      this.taxForm.controls.FileType.setValue('');
      this.taxForm.controls.FileName.setValue('');
      this.taxForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if (filetype.toLowerCase() === 'video/mp4' && extension.toLowerCase() === 'mp4') {
      this.taxForm.controls.FileType.setValue('Video');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'audio/vnd.dlna.adts' && extension.toLowerCase() === 'aac') ||
      (filetype.toLowerCase() === 'audio/mpeg' && extension.toLowerCase() === 'mp3')) {
      this.taxForm.controls.FileType.setValue('Audio');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.taxForm.controls.FileType.setValue('Photo');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.taxForm.controls.FileType.setValue('PDF');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/msword' && extension.toLowerCase() === 'doc') ||
      (filetype.toLowerCase() === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        extension.toLowerCase() === 'docx')) {
      this.taxForm.controls.FileType.setValue('DOC');
      this.taxForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.taxForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
}
