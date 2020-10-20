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
  Array5: any[];
  keyword = 'Area';
  breadCrumbItems: Array<any>;
  areas: string[];
  style: string;

  constructor(private Fb: FormBuilder, private service: GeneralService) { }
  ngOnInit() {
    this.style = 'height: 100%; display: block; width: 100%; padding: 0.52rem 0.9rem; font-size: 0.875rem;font-weight: 400;';
    this.style += 'border: 1px solid #ced4da; line-height: 1.5; color: #6c757d; background-color: #fff; background-clip: ';
    this.style += 'padding-box; border-radius: 4px;';
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Property List', path: '/property' },
    { label: 'Add New Property', path: '/property/create', active: true }];
    document.querySelector('.autocomplete-container').setAttribute('style',
      'box-shadow: none; height: calc(1.5em + 0.9rem + 2px)');
    document.querySelector('.autocomplete-container .input-container input').setAttribute('style', this.style);
    this.myForm = this.Fb.group({
      OwnerShip: this.Fb.array([
        this.initOwner(),
      ]),
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
      InCharge: this.Fb.array([
        this.initIncharge(),
      ]),
    });
    this.fetchpropertytype();
    this.myForm.controls.CreatedBy.setValue('1');
    this.myForm.controls.UserID.setValue('1');
  }
  save() {
    this.service.addproperty(this.myForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
            console.log(data, 'response');
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
    const control = this.myForm.controls.OwnerShip as FormArray;
    control.push(this.initOwner());
  }

  removeOwner(i: number) {
    const control = this.myForm.controls.OwnerShip as FormArray;
    control.removeAt(i);
  }

  addIncharge() {
    const control = this.myForm.controls.InCharge as FormArray;
    control.push(this.initIncharge());
  }
  removeIncharge(i: number) {
    const control = this.myForm.controls.InCharge as FormArray;
    control.removeAt(i);
  }
  selectEvent(item) {
    // do something with selected item
    this.myForm.controls.VillageID.setValue(item.VillageId);
    this.myForm.controls.DistrictID.setValue(item.DistrictId);
    this.myForm.controls.TalukaID.setValue(item.TalukaId);
    this.myForm.controls.StateID.setValue(item.stateID);
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
    } else if (search.length === 0) {
      this.areas = null;
    }
  }
  onFocused(e) {

  }
}
