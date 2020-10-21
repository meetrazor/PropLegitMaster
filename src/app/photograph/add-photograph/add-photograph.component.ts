import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-photograph',
  templateUrl: './add-photograph.component.html',
  styleUrls: ['./add-photograph.component.scss']
})
export class AddPhotographComponent implements OnInit {
  photographForm: FormGroup;
  file: any;



  constructor(private generalService: GeneralService) {
    this.photographForm = new FormGroup({
      FileName: new FormControl(null, Validators.required),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      uploadfile: new FormControl(null)

    });
  }

  ngOnInit() {
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

  onSubmit() {
    if (this.photographForm.valid) {
      // 1 is Property ID
      this.generalService.Addphotograph(1, this.prepareSave())
        .subscribe(data => {
          console.log(data);
          this.photographForm.reset();
        });
    }
  }

}

