import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lawyer',
  templateUrl: './add-lawyer.component.html',
  styleUrls: ['./add-lawyer.component.scss']
})

export class AddLawyerComponent implements OnInit {
  lawyerForm: FormGroup;
  submitted = false;
  error = '';
  keyword = 'Area';
  areas: string[];

  isEdit = false;
  isAreaLoaded = false;
  initialValue = '';
   urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: GeneralService) {
    if (this.route.snapshot.routeConfig.path === 'edit/:id') {
    this.isEdit = true;
    }
   }
  ngOnInit() {
          this.lawyerForm = this.formBuilder.group({
          LawyerName:  new FormControl('', [Validators.required, Validators.maxLength(25)]),
          Firm:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
          MobileNo:   new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
          LandlineNo: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
          Address:  new FormControl('', [Validators.required, Validators.maxLength(255)]),
          IsActive:  new FormControl('1', Validators.required),
          PinCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
          Fax: new FormControl(null, Validators.required),
          EmailId: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
          Website: new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)]),
          TalukaId: '',
          VillageId: '',
          DistrictId: '',
          City: new FormControl('', [Validators.required, Validators.maxLength(25)]),
          RecordDate: new FormControl(new Date(), Validators.required),
        });
          if (this.isEdit === true) {
          this.setInitialValue();
        }
  }
  setInitialValue() {
    this.service.viewLawyer(this.route.snapshot.params.id).subscribe(Res => {

      this.service.areabyid( Res.data[0].VillageId).subscribe(Res1 => {
        this.initialValue = Res1.data[0];
        this.isAreaLoaded = true;
    });

      this.lawyerForm.get('LawyerName').setValue(Res.data[0].LawyerName);
      this.lawyerForm.get('Firm').setValue(Res.data[0].Firm);
      this.lawyerForm.get('MobileNo').setValue(Res.data[0].MobileNo);
      this.lawyerForm.get('LandlineNo').setValue(Res.data[0].LandlineNo);
      this.lawyerForm.get('PinCode').setValue(Res.data[0].PinCode);
      this.lawyerForm.get('Website').setValue(Res.data[0].Website);
      this.lawyerForm.get('Fax').setValue(Res.data[0].Fax);
      this.lawyerForm.get('Address').setValue(Res.data[0].Address);
      this.lawyerForm.get('City').setValue(Res.data[0].City);
      this.lawyerForm.get('EmailId').setValue(Res.data[0].EmailId);
      this.lawyerForm.get('VillageId').setValue(Res.data[0].VillageId);
      this.lawyerForm.get('DistrictId').setValue(Res.data[0].DistrictId);
      this.lawyerForm.get('TalukaId').setValue(Res.data[0].TalukaId);
    });
  }
  selectEvent(item) {
    this.lawyerForm.controls.VillageId.setValue(item.VillageId);
    this.lawyerForm.controls.DistrictId.setValue(item.DistrictId);
    this.lawyerForm.controls.TalukaId.setValue(item.TalukaId);
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
  isValid(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }
  GoBack() {
    this.router.navigate(['lawyer']);
  }

      onSubmit() {
        this.submitted = true;
        if (this.lawyerForm.valid && this.isEdit === false) {
            this.service.addLawyer(this.lawyerForm.value)
              .subscribe(data => {
                this.submitted = false;
                this.lawyerForm.reset();
                if (data.status === 200) {
                  Swal.fire({
                    title: 'Added',
                    text: data.message,
                    type: 'success',
                    timer: 2000
                  }).then(() => {
                    this.router.navigate(['lawyer']);
                  });
                } else {
                  Swal.fire({
                    title: data.error_code,
                    text: data.message,
                    type: 'error'
                  });
                }
              });
        } else if ( this.lawyerForm.valid && this.isEdit === true) {
            this.service.updateLawyer(this.lawyerForm.value, this.route.snapshot.params.id)
            .subscribe(data => {
              if (data.status === 200) {
                Swal.fire({
                  title: 'Updated',
                  text: data.message,
                  type: 'success',
                  timer: 2000
                }).then(() => {
                  this.router.navigate(['lawyer']);
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
