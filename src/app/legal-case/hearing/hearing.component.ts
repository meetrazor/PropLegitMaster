import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hearing',
  templateUrl: './hearing.component.html',
  styleUrls: ['./hearing.component.scss']
})
export class HearingComponent implements OnInit {

  hearingForm: FormGroup;
  submit = false;
  constructor( private route: ActivatedRoute, private service: GeneralService,
               public dialog: MatDialog , @Inject(MAT_DIALOG_DATA) public data) {

                this.hearingForm = new FormGroup({
       LegalCaseID: new FormControl(data, Validators.required),
       NextHearingDate:  new FormControl('', Validators.required),
       DecisionDate:   new FormControl(''),
       IsLastHearing: new FormControl('1', Validators.required),
     });
}
onSubmitHearingData() {
  this.submit = true;
  if (this.hearingForm.valid) {
    this.service.addLegalCaseHearing(this.hearingForm.value, this.data)
    .subscribe(data => {
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
get f() { return this.hearingForm.controls; }
  ngOnInit() {
  }
}
