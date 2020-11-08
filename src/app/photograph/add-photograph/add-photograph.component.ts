import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-photograph',
  templateUrl: './add-photograph.component.html',
  styleUrls: ['./add-photograph.component.scss']
})
export class AddPhotographComponent implements OnInit {
  photographForm: FormGroup;
  file: any;
  @Input() propertyId: number;
  isLoading: boolean;
  submited: boolean;

  constructor(private generalService: GeneralService) {
    this.photographForm = new FormGroup({
      FileName: new FormControl(null, Validators.required),
      FileType: new FormControl('', Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null, Validators.required)

    });
  }

  ngOnInit() {
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
    input.append('uploadfile', (this.photographForm.get('uploadfile').value)[0]);

    return input;
  }
  get f() { return this.photographForm.controls; }
  onSubmit() {
    this.submited = true;
    if (this.photographForm.valid) {
      // 1 is Property ID
      this.isLoading = true;
      this.generalService.Addphotograph(this.propertyId, this.prepareSave())
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

}

