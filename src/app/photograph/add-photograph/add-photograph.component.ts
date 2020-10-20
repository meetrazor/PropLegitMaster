import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-photograph',
  templateUrl: './add-photograph.component.html',
  styleUrls: ['./add-photograph.component.scss']
})
export class AddPhotographComponent implements OnInit {
  photographForm : FormGroup;

  

  constructor(private generalService : GeneralService) { 
    this.photographForm = new FormGroup({
      FileName : new FormControl(null, Validators.required),
      FileType : new FormControl(null, Validators.required),
      Description : new FormControl(null, Validators.required),
      uploadfile : new FormControl(null)

    })
  }

  ngOnInit() {
  }

  UploadChange(event) {
    debugger
    // console.log(this.fileInput.nativeElement.value)
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.photographForm.get('uploadfile').setValue(file);
      this.photographForm.setErrors({ 'valid': true });
    }else{
      this.photographForm.setErrors({ 'invalid': true });
    }

    // if (event.target.files && event.target.files[0]) {
     
     
    //     const file = event.target.files[0];
    //     const mimeType = file.type;
    //     if (((mimeType.match(/image\/jpg/) == null) && (mimeType.match(/image\/jpeg/) == null))) {
         
    //     } else {
    //       this.imageGallery.push(event.target.files[i]);
    //       // this.URLs.push(file);
    //     }
    //   }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.photographForm.get('FileName').value);
    input.append('FileType', this.photographForm.get('FileType').value);
    input.append('Description', this.photographForm.get('Description').value);
    input.append('uploadfile', this.photographForm.get('uploadfile').value);

    return input;
  }

  onSubmit(){
    if(this.photographForm.valid){
     
      this.generalService.Addphotograph(1, this.prepareSave())
      .subscribe(data => {
        console.log(data);
      })

    }
  }

  clearFile() {
    this.photographForm.get('uploadfile').setValue(null);
  }

}

