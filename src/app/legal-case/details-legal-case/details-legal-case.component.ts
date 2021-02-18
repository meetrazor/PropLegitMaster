import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-legal-case',
  templateUrl: './details-legal-case.component.html',
  styleUrls: ['./details-legal-case.component.scss']
})
export class DetailsLegalCaseComponent implements OnInit {
  today = new Date();
  currentUser: any;
  isFormLoading: boolean;
  @Input() CaseID: any;
  @Input() status: any;
  actForm: FormGroup;
  hearingForm: FormGroup;
  submited: boolean;
  Loading: boolean;
  @ViewChild('ActForm', { static: true }) ActFormModal;
  @ViewChild('HearingForm', { static: true }) HearingFormModal;
  constructor(private service: GeneralService, private modalService: NgbModal, private formBuilder: FormBuilder, private datepipe: DatePipe) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.submited = false;
    this.isFormLoading = false;
  }
  AddAct() {
    this.initActForm();
    this.modalService.open(this.ActFormModal)
  }
  AddHearing() {
    this.initHearingForm();
    this.modalService.open(this.HearingFormModal)
  }
  initActForm() {
    this.actForm = this.formBuilder.group({
      UnderAct: new FormControl(null, Validators.required),
      UnderSection: new FormControl(null, Validators.required),
    })
  }
  callback() {
    return false;
  }
  initHearingForm() {
    this.isFormLoading = true;
    this.service.GetLegalCaseLastHearing(this.CaseID).subscribe((res) => {
      this.hearingForm = this.formBuilder.group({
        HearingDate: new FormControl(null, [Validators.required]),
        IsDetailsChange: new FormControl(res.data ? '0' : '1', Validators.required),
        Judge: new FormControl(res.data ? res.data.Judge : null, Validators.required),
        CourtName: new FormControl(res.data ? res.data.CourtName : null, Validators.required),
        CourtNumber: new FormControl(res.data ? res.data.CourtNumber : null, Validators.required),
        CourtAddress: new FormControl(res.data ? res.data.CourtAddress : null, Validators.required),
        CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      });
      this.isDetailsChange(res.data ? '0' : '1');
      this.isFormLoading = false;
    })
  }
  isDetailsChange(e) {
    if (e == 0) {
      this.f.Judge.disable();
      this.f.CourtName.disable();
      this.f.CourtNumber.disable();
      this.f.CourtAddress.disable();
    } else if (e == 1) {
      this.f.Judge.enable();
      this.f.CourtName.enable();
      this.f.CourtNumber.enable();
      this.f.CourtAddress.enable();
    }
  }
  onSaveAct() {
    this.submited = true;
    this.Loading = true;
    if (this.actForm.valid) {
      this.service.AddLegalCaseAct(this.CaseID, this.actForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
          }).then(() => {
            this.submited = false;
            this.Loading = false;
          });
        } else {
          this.actForm.reset();
          this.submited = false;
          this.Loading = false;
          Swal.fire({
            title: 'Success!',
            text: res.message,
            type: 'success',
            timer: 2000
          }).then(() => {
            location.reload();
          });
        }

      });
    } else {
      this.Loading = false;
    }
  }
  onSaveHearing() {
    this.submited = true;
    this.Loading = true;
    if (this.hearingForm.valid) {
      this.service.AddLegalCaseHearing(this.CaseID, this.hearingForm.value).subscribe((res) => {
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.error,
            type: 'error'
          }).then(() => {
            this.submited = false;
            this.Loading = false;
          });
        } else {
          this.submited = false;
          this.Loading = false;
          Swal.fire({
            title: 'Success!',
            text: res.message,
            type: 'success',
            timer: 2000
          }).then(() => {
            location.reload();
          });
        }

      });
    } else {
      this.Loading = false;
    }
  }

  get e() { return this.actForm.controls; }
  get f() { return this.hearingForm.controls; }
}
