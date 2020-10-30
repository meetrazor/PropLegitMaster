import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
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
  StateList: any[];
  DistrictList: any[];
  isSelected = true;
  IsOpenLand = true;
  IsCitySurvey = false;
  submitted = false;

  constructor(private Fb: FormBuilder, private service: GeneralService, private router: Router) { }
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
        this.initOwner()
      ]),
      PropertyTypeID: new FormControl('', Validators.required),
      PropertyName: new FormControl('', Validators.required),
      TalukaID:  new FormControl('', Validators.required),
      VillageID:  new FormControl('', Validators.required),
      DistrictID: new FormControl('', Validators.required),
      StateID: new FormControl('', Validators.required),
      CreatedBy: '',
      UserID: '',
      taluka: new FormControl('', Validators.required),
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

      RecordDate: new FormControl(new Date()),
      milkatno_propId: new FormControl(''),
      RevenewOfficeType: new FormControl('', Validators.required),
      PostalAddress: new FormControl(''),
      Description: new FormControl(''),
      LandSize: new FormControl(''),
      WaterAvailability: new FormControl(''),
      StatusOfElectricity: new FormControl(''),
      AgeOfProperty: new FormControl(''),
      NoOfBHK: new FormControl(''),
      FurnishType: new FormControl(''),
      InCharge: this.Fb.array([
        this.initIncharge()
      ]),
      types: new FormControl('surveyno')
    });
    this.fetchstatelist();
    this.fetchpropertytype();
    this.myForm.controls.CreatedBy.setValue('1');
    this.myForm.controls.UserID.setValue('1');
  }
  ChangeState(e) {
    this.service.districts(this.myForm.controls.StateID.value)
          .pipe(first())
          .subscribe(
            data => {
              if (data.error) {
                Swal.fire({
                  title: data.error_code,
                  text: data.message,
                  type: 'error'
                });
                return;
              } else {
                this.DistrictList = data.data;
                if (this.DistrictList.length > 0) {
                this.myForm.controls.DistrictID.enable();
                } else {
                this.myForm.controls.DistrictID.disable();
                }
              }
            });
  }

   handleChange() {
     if (this.myForm.controls.PropertyTypeID.value == 1 || this.myForm.controls.PropertyTypeID.value == 3) {
       this.myForm.controls.TPNo.enable();
       this.myForm.controls.FPNo.enable();
       this.myForm.controls.SurveyNo.enable();

       this.myForm.controls.CitySurveyNo.disable();
       this.myForm.controls.CitySurveyOffice.disable();
       this.myForm.controls.CityWardNo.disable();
       this.myForm.controls.CityWardName.disable();
       this.myForm.controls.SheetNumber.disable();
       this.myForm.controls.BuildingNo.disable();
       this.myForm.controls.BuildingName.disable();
     } else if (this.myForm.controls.types.value == 'surveyno') {
       this.myForm.controls.TPNo.enable();
       this.myForm.controls.FPNo.enable();
       this.myForm.controls.BuildingNo.enable();
       this.myForm.controls.BuildingName.enable();
       this.myForm.controls.SurveyNo.enable();
       this.myForm.controls.CitySurveyNo.disable();
       this.myForm.controls.CitySurveyOffice.disable();
       this.myForm.controls.CityWardNo.disable();
       this.myForm.controls.CityWardName.disable();
       this.myForm.controls.SheetNumber.disable();
     } else if (this.myForm.controls.types.value == 'citysurveyno') {
       this.myForm.controls.CitySurveyNo.enable();
       this.myForm.controls.CitySurveyOffice.enable();
       this.myForm.controls.CityWardNo.enable();
       this.myForm.controls.CityWardName.enable();
       this.myForm.controls.SheetNumber.enable();
       this.myForm.controls.TPNo.disable();
       this.myForm.controls.FPNo.disable();
       this.myForm.controls.BuildingNo.disable();
       this.myForm.controls.BuildingName.disable();
       this.myForm.controls.SurveyNo.disable();
     }
     this.submitted = false;
   }

  ChangePropertyType(e) {

    if (this.myForm.controls.PropertyTypeID.value == 1 || this.myForm.controls.PropertyTypeID.value == 3) {
      this.IsOpenLand = true;
    } else {
      this.IsOpenLand = false;
    }
    this.handleChange();
  }

ChangeSurveyType(e) {
    if (this.myForm.controls.types.value === 'citysurveyno') {
      this.IsCitySurvey = true;
    }

    if (this.myForm.controls.types.value === 'surveyno') {
      this.IsCitySurvey = false;
    }
    this.handleChange();
  }
save() {
  this.handleChange();
  this.submitted = true;
  if (this.myForm.invalid) {
    return;
  }
  this.service.addproperty(this.myForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            return;
          } else {
            Swal.fire({
              title: 'Property Added Successfully!',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              this.router.navigate(['property']);
            });
          }
        });
}
fetchpropertytype() {
    this.service.propertytype()
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
            return;
          } else {
            this.Array5 = data.data;
          }
        });
  }

fetchstatelist() {
    this.service.fetchstatelist()
    .pipe(first())
    .subscribe(
      data => {
        if (data.error) {
          Swal.fire({
            title: data.error_code,
            text: data.message,
            type: 'error'
          });
          return;
        } else {
          this.StateList = data.data;
        }
      });
    this.myForm.controls.DistrictID.disable();
  }

initOwner() {
    return this.Fb.group({
      OwnerName: new FormControl(''),
      SinceFrom: new FormControl('')
    });
  }
initIncharge() {
    return this.Fb.group({
      InChargeName: new FormControl(''),
      Designation: new FormControl(''),
      MobileNo: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
      Email: new FormControl('', Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ),
      Address: new FormControl(''),
      InChargeFromDate: new FormControl(''),
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
            return;
          } else {
            this.areas = data.data;
          }
        });
  }
onChangeSearch(search: string) {
    //  fetch remote data from here
    //  And reassign the 'data' which is binded to 'data' property.

    if (!this.myForm.controls.StateID.value) {
     alert('select State');
     return;
    }

    if (!this.myForm.controls.DistrictID.value) {
     alert('select district');
     return;
    }
    if (search.length >= 3) {
    this.service.areabystateid(this.myForm.controls.StateID.value, this.myForm.controls.DistrictID.value, search)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            return;
          } else {
            this.areas = data.data;
          }
        });
    } else if (search.length === 0) {
      this.areas = null;
    }
  }
onFocused(e) {
  }
  get f() { return this.myForm.controls; }

  isValid(event, length) {
    if (((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) ||
    (event.keyCode > 96 && event.keyCode < 123) ||
    event.key == '/' || event.key == '.' || event.key === '+' || event.key == '-') && event.target.value.length < length) {
    { }
    } else {
      return false;
    }
  }

  isValidMobileNo(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }

  GoBack() {
    this.router.navigate(['property']);
  }
  }


