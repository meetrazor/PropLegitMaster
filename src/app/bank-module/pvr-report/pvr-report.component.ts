import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pvr-report',
  templateUrl: './pvr-report.component.html',
  styleUrls: ['./pvr-report.component.scss']
})
export class PvrReportComponent implements OnInit {
  breadCrumbItems: any;
  appID: any;
  applicationData: any;
  submitted: boolean;
  isLoading: boolean;
  PVRStatusList = ['Verified', 'Partially Verified', 'Not Verified'];
  PVRForm: FormGroup;
  currentUser: any;
  constructor(private service: GeneralService, private route: ActivatedRoute, private Fb: FormBuilder, private router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'PVR Report', path: '/', active: true }];
    this.appID = this.route.snapshot.params.Appid;
  }

  ngOnInit() {
    this.isLoading = true;
    this.submitted = false;
    this.currentUser = this.service.getcurrentUser();
    this.service.GetApplicationInformation(this.appID).subscribe((res) => {
      console.log(res.data[0]);
      this.applicationData = res.data[0];
      this.isLoading = false;
      this.PVRForm = this.Fb.group({
        OwnerCoOwnersName: this.Fb.array([
          this.initOwner()
        ]),
        EncumbranceDetails: this.Fb.array([
          this.initEncumbranceDetails()
        ]),
        CropDetails: this.Fb.array([
          this.initCropDetails()
        ]),
        TotalLandSize: new FormControl('', Validators.required),
        OwnerRemarks: new FormControl('', Validators.required),
        PropertyRemarks: new FormControl('', Validators.required),
        PVRStatus: new FormControl('', Validators.required),
        EncumbranceRemarks: new FormControl('', Validators.required),
        CreatedBy: new FormControl(this.currentUser.UserID),
      });
    });

  }
  initOwner(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        OwnersName: new FormControl(i.OwnerName, Validators.required),
      });
    } else {
      return this.Fb.group({
        OwnersName: new FormControl('', Validators.required)
      });
    }
  }
  initEncumbranceDetails(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        LoanTakenBy: new FormControl(i.LoanTakenBy, Validators.required),
        LoanAmount: new FormControl(i.LoanAmount, Validators.required),
        LoanTakenOn: new FormControl(i.LoanTakenOn, Validators.required),
        LoanGivenBy: new FormControl(i.LoanGivenBy, Validators.required)
      });
    } else {
      return this.Fb.group({
        LoanTakenBy: new FormControl('', Validators.required),
        LoanAmount: new FormControl('', Validators.required),
        LoanTakenOn: new FormControl('', Validators.required),
        LoanGivenBy: new FormControl('', Validators.required)
      });
    }
  }
  initCropDetails(i?) {
    if (i && i !== undefined) {
      return this.Fb.group({
        Year: new FormControl(i.Year, Validators.required),
        Season: new FormControl(i.Season, Validators.required),
        Crop: new FormControl(i.Crop, Validators.required),
        Area: new FormControl(i.Area, Validators.required),
        MSP: new FormControl(i.MSP, Validators.required)
      });
    } else {
      return this.Fb.group({
        Year: new FormControl('', Validators.required),
        Season: new FormControl('', Validators.required),
        Crop: new FormControl('', Validators.required),
        Area: new FormControl('', Validators.required),
        MSP: new FormControl('', Validators.required)
      });
    }
  }
  get f() { return this.PVRForm.controls; }
  save() {
    this.submitted = true;
    if (this.PVRForm.valid) {
      this.isLoading = true;
      this.service.SavePVR(this.PVRForm.value, this.appID).subscribe((res) => {
        this.isLoading = false;
        if (res.error) {
          Swal.fire({
            title: res.error_code,
            text: res.message,
            type: 'error'
          });
          return;
        } else {
          Swal.fire({
            title: 'Success',
            text: res.message,
            type: 'success'
          }).then(() => {
            this.router.navigate(['/loan']);
          });
        }
        this.isLoading = false;
      });
    } else {
      Swal.fire({
        title: 'Invalid',
        text: 'Invalid Form Data',
        type: 'error'
      });
    }
  }
  addEncumbranceDetails() {
    const control = this.PVRForm.controls.EncumbranceDetails as FormArray;
    control.push(this.initEncumbranceDetails());
  }
  removeEncumbranceDetails(i) {
    const control = this.PVRForm.controls.EncumbranceDetails as FormArray;
    control.removeAt(i);
  }
  removeCropDetails(i) {
    const control = this.PVRForm.controls.CropDetails as FormArray;
    control.removeAt(i);
  }
  addCropDetails() {
    const control = this.PVRForm.controls.CropDetails as FormArray;
    control.push(this.initCropDetails());
  }
  removeOwnerDetails(i) {
    const control = this.PVRForm.controls.OwnerCoOwnersName as FormArray;
    control.removeAt(i);
  }
  addOwnerDetails() {
    const control = this.PVRForm.controls.OwnerCoOwnersName as FormArray;
    control.push(this.initOwner());
  }
}
