import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {

  public myForm: FormGroup;
  Array5: any[];
  keyword = 'Area';
  breadCrumbItems: Array<any>;
  areas: string[];
  style: string;
  propertydata: {};
  initialValue = '';
  isDataLoaded = false;

  constructor(private Fb: FormBuilder, private service: GeneralService, private route: ActivatedRoute, private router: Router
    ) {}

  ngOnInit() {
    this.fetchproperty(this.route.snapshot.paramMap.get('id'));
    this.myForm = this.Fb.group({
      OwnerShip: this.Fb.array([]),
      PropertyTypeID: new FormControl('', Validators.required),
      PropertyName: new FormControl('', Validators.required),
      TalukaID: '',
      VillageID: '',
      DistrictID: '',
      StateID: '',
      CreatedBy: '',
      UserID: '',
      CitySurveyNo: new FormControl('', Validators.required),
      CitySurveyOffice: new FormControl('', Validators.required),
      CityWardNo: new FormControl('', Validators.required),
      CityWardName: new FormControl('', Validators.required),
      SheetNumber: new FormControl('', Validators.required),
      SurveyNo: new FormControl('', Validators.required),
      TPNo: new FormControl('', Validators.required),
      FPNo: new FormControl('', Validators.required),
      BuildingNo: new FormControl('', Validators.required),
      BuildingName: new FormControl('', Validators.required),
      RecordDate: new FormControl('', Validators.required),
      milkatno_propId: new FormControl('', Validators.required),
      RevenewOfficeType: new FormControl('', Validators.required),
      PostalAddress: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      LandSize: new FormControl('', Validators.required),
      WaterAvailability: new FormControl('', Validators.required),
      StatusOfElectricity: new FormControl('', Validators.required),
      AgeOfProperty: new FormControl('', Validators.required),
      NoOfBHK: new FormControl('', Validators.required),
      FurnishType: new FormControl('', Validators.required),
      InCharge: this.Fb.array([]),
    });
    this.fetchpropertytype();
  }
  save() {
    this.service.editproperty(this.route.snapshot.paramMap.get('id'), this.myForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            alert('Data updated successfully');
            this.router.navigate(['property']);
          }
        });
  }
  fetchpropertytype() {
    this.service.propertytype()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.Array5 = data.data;
          }
        });
  }

  initOwner(i?) {
    if ( i && i !== undefined) {
    return this.Fb.group({
      OwnerName: new FormControl(i.OwnerName, Validators.required),
      SinceFrom: new FormControl(moment(i.SinceFrom).format('YYYY-MM-DD'), Validators.required)
    });
  } else {
    return this.Fb.group({
      OwnerName: new FormControl('', Validators.required),
      SinceFrom: new FormControl('', Validators.required)
    });
  }
  }
  initIncharge(i?) {
    if ( i && i !== undefined) {
    return this.Fb.group({
      InChargeName: new FormControl(i.InChargeName, Validators.required),
      Designation: new FormControl(i.Designation, Validators.required),
      InChargeType: new FormControl(i.InChargeType, Validators.required),
      MobileNo: new FormControl(i.MobileNo, Validators.required),
      Email: new FormControl(i.Email, Validators.required),
      Address: new FormControl(i.Address, Validators.required),
      InChargeFromDate: new FormControl(moment(i.InChargeFromDate).format('YYYY-MM-DD'), Validators.required),
    });
  } else {
    return this.Fb.group({
      InChargeName: new FormControl('', Validators.required),
      Designation: new FormControl('', Validators.required),
      InChargeType: new FormControl('', Validators.required),
      MobileNo: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      InChargeFromDate: new FormControl('', Validators.required),
    });
  }
  }
  addOwner() {
    const control =  this.myForm.get('OwnerShip') as FormArray;
    control.push(this.initOwner());
  }

  removeOwner(i: number) {
    const control =  this.myForm.get('OwnerShip') as FormArray;
    control.removeAt(i);
  }

  addIncharge() {
    const control =  this.myForm.get('InCharge') as FormArray;
    control.push(this.initIncharge());
  }
  removeIncharge(i: number) {
    const control = this.myForm.get('InCharge') as FormArray;
    control.removeAt(i);
  }
  selectEvent(item) {
    // do something with selected item
    this.myForm.get('VillageID').setValue(item.VillageId);
    this.myForm.get('DistrictID').setValue(item.DistrictId);
    this.myForm.get('TalukaID').setValue(item.TalukaId);
    this.myForm.get('StateID').setValue(item.stateID);
  }
  fetcharea(search) {
    this.service.area(search)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            this.areas = data.data;
          }
        });
  }
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (search.length >= 3) {
      this.fetcharea(search);
    }
  }

  fetchproperty(propertyID) {
    this.service.viewproperty(propertyID)
    .pipe(first())
    .subscribe(
      data => {
        if (data.error) {
          console.log(data.error);
          return;
        } else {
          this.myForm.get('AgeOfProperty').setValue(data.data.AgeOfProperty);
          this.myForm.get('PropertyTypeID').setValue(data.data.PropertyTypeID);
          this.myForm.get('PropertyName').setValue(data.data.PropertyName);
          this.myForm.get('CitySurveyNo').setValue(data.data.CitySurveyNo);
          this.myForm.get('CitySurveyOffice').setValue(data.data.CitySurveyOffice);
          this.myForm.get('CityWardNo').setValue(data.data.CityWardNo);
          this.myForm.get('CityWardName').setValue(data.data.CityWardName);
          this.myForm.get('SheetNumber').setValue(data.data.SheetNumber);
          this.myForm.get('SurveyNo').setValue(data.data.SurveyNo);
          this.myForm.get('TPNo').setValue(data.data.TPNo);
          this.myForm.get('FPNo').setValue(data.data.FPNo);
          this.myForm.get('BuildingNo').setValue(data.data.BuildingNo);
          this.myForm.get('BuildingName').setValue(data.data.BuildingName);
          this.myForm.get('RecordDate').setValue(moment(data.data.RecordDate).format('YYYY-MM-DD'));
          this.myForm.get('milkatno_propId').setValue(data.data.milkatno_propId);
          this.myForm.get('RevenewOfficeType').setValue(data.data.RevenewOfficeType);
          this.myForm.get('PostalAddress').setValue(data.data.PostalAddress);
          this.myForm.get('Description').setValue(data.data.Description);
          this.myForm.get('LandSize').setValue(data.data.LandSize);
          this.myForm.get('StatusOfElectricity').setValue(data.data.StatusOfElectricity);
          this.myForm.get('WaterAvailability').setValue(data.data.WaterAvailability);
          this.myForm.get('NoOfBHK').setValue(data.data.NoOfBHK);
          this.myForm.get('FurnishType').setValue(data.data.FurnishType);

          this.myForm.get('TalukaID').setValue(data.data.TalukaID);
          this.myForm.get('VillageID').setValue(data.data.VillageID);
          this.myForm.get('DistrictID').setValue(data.data.DistrictID);
          this.myForm.get('StateID').setValue(data.data.StateID);
          this.myForm.get('CreatedBy').setValue(data.data.CreatedBy);
          this.myForm.get('UserID').setValue(data.data.UserID);
          this.initialValue = data.data.Area;
          this.isDataLoaded = true;
          this.onChangeSearch(data.data.Area);

          for ( const i of data.data.InCharge) {
            const control = this.myForm.get('InCharge') as FormArray;
            control.push(this.initIncharge(i));
          }
          for ( const i of data.data.Ownership) {
            const control = this.myForm.get('OwnerShip') as FormArray;
            control.push(this.initOwner(i));
          }
        }
      }
    );
  }
  onFocused(e) {
  }
}
