import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  docsForm: FormGroup;
  submit = false;
  constructor( private route: ActivatedRoute, private service: GeneralService,
               @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) {}
  ngOnInit() {
    this.docsForm = new FormGroup({
      LegalCaseID: new FormControl(this.data.LegalCaseID, Validators.required),
      FileName: new FormControl(null, Validators.required),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required)
    });
  }
  private prepareSave(): any {
    const input = new FormData();
    input.append('LegalCaseID', this.docsForm.get('LegalCaseID').value);
    input.append('FileName', this.docsForm.get('FileName').value);
    input.append('FileType', this.docsForm.get('FileType').value);
    input.append('Description', this.docsForm.get('Description').value);
    input.append('uploadfile', (this.docsForm.get('uploadfile').value)[0]);
    return input;
  }
  get f() { return this.docsForm.controls; }
  onSubmit() {
    this.submit = true;
    if (this.docsForm.valid) {
      this.service.Addphotograph(this.data.PropertyID, this.prepareSave())
        .subscribe(data => {
          console.log(data);
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success'
            });
            this.dialog.closeAll();
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
