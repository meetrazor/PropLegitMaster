import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  public myForm: FormGroup;
  StateArray: string[];
  Array2: string[];
  Array3: string[];
  Array4: string[];
  Array5: string[];
  constructor(private Fb: FormBuilder, private service: GeneralService) { }
  ngOnInit() {
    this.myForm = this.Fb.group({
      OwnerShip: this.Fb.array([
        this.initOwner(),
      ]),
      PropertyTypeID: new FormControl('', Validators.required),
      PropertyName: new FormControl('', Validators.required),
      TalukaID: new FormControl('', Validators.required),
      VillageID: new FormControl('', Validators.required),
      DistrictID: new FormControl('', Validators.required),
      StateID: new FormControl('', Validators.required),
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
      InCharge: this.Fb.array([
        this.initIncharge(),
      ]),
    });
    this.fetchstate();
    this.fetchpropertytype();
  }
  save() {
    this.service.addproperty(this.myForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error)
            return;
          } else {
            console.log(data, 'response');
          }
        });
  }
  fetchstate(){
    this.service.states()
    .pipe(first())
    .subscribe(
      data => {
        if (data.error) {
          console.log(data.error)
          return;
        } else {
          this.StateArray = data.data;
        }
      });
  }

  fetchdist() {
    this.service.districts(this.myForm.controls.StateID.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error)
            return;
          } else {
            this.Array2 = data.data;
          }
        });
  }

  fetchtaluka() {
    this.service.talukas(this.myForm.controls.DistrictID.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error)
            return;
          } else {
            this.Array3 = data.data;
          }
        });
  }
  fetchtvillage() {
    this.service.villages(this.myForm.controls.TalukaID.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error)
            return;
          } else {
            this.Array4 = data.data;
          }
        });
  }
  fetchpropertytype() {
    this.service.propertytype()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error)
            return;
          } else {
            this.Array5 = data.data;
          }
        });
  }

  initOwner() {
    return this.Fb.group({
      OwnerName: new FormControl('', Validators.required),
      SinceFrom: new FormControl('', Validators.required)
    });
  }
  initIncharge() {
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
  addOwner() {
    const control = <FormArray>this.myForm.controls['OwnerShip'];
    control.push(this.initOwner());
  }

  removeOwner(i: number) {
    const control = <FormArray>this.myForm.controls['OwnerShip'];
    control.removeAt(i);
  }

  addIncharge() {
    const control = <FormArray>this.myForm.controls['InCharge'];
    control.push(this.initIncharge());
  }
  removeIncharge(i: number) {
    const control = <FormArray>this.myForm.controls['InCharge'];
    control.removeAt(i);
  }
}
