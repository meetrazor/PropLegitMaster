import { Subject } from 'rxjs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  photographForm: FormGroup;
  breadCrumbItems: any;
  applicationData: any;
  currentUser: any;
  DocumentList: Array<any>;
  file: any;
  isLoading: boolean;
  submited: boolean;
  fileExtension: string;
  @ViewChild('Files', { static: false }) files: any;
  constructor(private generalService: GeneralService, private router: Router, private route: ActivatedRoute) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/loan' }, { label: 'Upload Documents', path: '/', active: true }];
    this.currentUser = this.generalService.getcurrentUser();
    this.photographForm = new FormGroup({
      FileName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      uploadfile: new FormControl(null, Validators.required),
      DocumentSubTypeId: new FormControl(null, Validators.required),
      UserID: new FormControl(this.currentUser.UserID, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      DocumentTypeId: new FormControl(null, Validators.required),
      selectDocument: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.DocumentList = [];
    this.isLoading = true;
    this.generalService.GetApplicationInformation(this.route.snapshot.params.Appid).subscribe((res) => {
      this.applicationData = res.data[0];
      this.generalService.GetDocumentList(this.route.snapshot.params.Appid).subscribe((res) => {
        this.isLoading = false;
        res.data.map((data) => {
          if (data.Status !== 'reviewed') {
            this.DocumentList.push(data);
          }
        });
        this.submited = false;
        this.isLoading = false;
        this.photographForm.controls.FileType.disable();
      });
    });


  }
  private prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('DocumentSubTypeId', this.photographForm.get('DocumentSubTypeId').value);
    input.append('uploadfile', (this.photographForm.get('uploadfile').value)[0]);
    input.append('UserID', (this.photographForm.get('UserID').value));
    input.append('CreatedBy', (this.photographForm.get('CreatedBy').value));
    input.append('DocumentTypeId', this.photographForm.get('DocumentTypeId').value);

    return input;
  }
  get f() { return this.photographForm.controls; }
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
      this.photographForm.controls.DocumentTypeId.setValue(null);
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.photographForm.controls.FileType.setValue('Photo');
      this.photographForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.photographForm.controls.FileType.setValue('PDF');
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
  onSubmit() {
    this.submited = true;
    if (this.photographForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      console.log(this.photographForm.value);

      this.generalService.Addphotograph(this.applicationData.PropertyID, this.prepareSave())
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
  Changedocument(e) {
    if (e) {
      this.f.DocumentSubTypeId.setValue(e.DocumentSubType);
      this.f.DocumentTypeId.setValue(e.DocumentType);
    } else {
      this.f.DocumentSubTypeId.setValue(null);
      this.f.DocumentTypeId.setValue(null);
    }
    console.log(e);

  }
}
