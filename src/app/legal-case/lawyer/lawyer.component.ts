import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {
lawyerForm: FormGroup;
submit = false;
lawyerList = [];
keyword = 'LawyerName';

constructor( private route: ActivatedRoute, private service: GeneralService, public dialog: MatDialog,
             @Inject(MAT_DIALOG_DATA) public data) {
    this.lawyerForm = new FormGroup({
      LegalCaseID: new FormControl(this.data, Validators.required),
      RespondentLawyer: new FormControl('', Validators.required),
      PetitionerLawyer:  new FormControl('', Validators.required),
    });
    this.fetchLawyerlist();
   }

  ngOnInit() {
  }

  fetchLawyerlist() {
    this.service.listLawyers().
    subscribe(data => {
      if (data.status == 200) {
      this.lawyerList = data.data;
      } else {
      console.log(data.error);
      }
    });
  }
  onLawyerSubmit() {
    this.submit = true;
    if (this.lawyerForm.valid) {
    this.submit = true;
    const inputData = {};
    inputData['LawyerID'] = this.lawyerForm.controls.RespondentLawyer.value.LawyerId;
    inputData['LegalCaseID'] = this.lawyerForm.controls.LegalCaseID.value;
    inputData['LawyerFor'] = 'Respondent';
    inputData['IsActive'] = 1;

    const inputData2 = {};
    inputData2['LawyerID'] = this.lawyerForm.controls.PetitionerLawyer.value.LawyerId;
    inputData2['LegalCaseID'] = this.lawyerForm.controls.LegalCaseID.value;
    inputData2['LawyerFor'] = 'Petitioner';
    inputData2['IsActive'] = 1;

    this.service.addLegalCaseLawyer(inputData, this.data)
    .subscribe(data => {
      if (data.status === 200) {
        this.service.addLegalCaseLawyer(inputData2, this.data)
        .subscribe(dataNew => {
          if (dataNew.status === 200) {
            Swal.fire({
              title: 'Added',
              text: dataNew.message,
              type: 'success'
            });
            this.dialog.closeAll();
          } else {
            Swal.fire({
              title: dataNew.error_code,
              text: dataNew.message,
              type: 'error'
            });
          }
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

  get f() { return this.lawyerForm.controls; }
}
