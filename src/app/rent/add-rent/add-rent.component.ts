import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.scss']
})
export class AddRentComponent implements OnInit {
  @Input() propertyId;
  tenantForm: FormGroup;
  submitted = false;
  error = '';
  isEdit = false;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  propertyData = null;
  minDate: Date;
  maxDate: Date;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: GeneralService) {
    if (this.route.snapshot.routeConfig.path === 'edit/:id') {
      this.isEdit = true;
    }
  }
  callback() {
    return false;
  }
  ngOnInit() {
    this.isLoading = false;
    this.maxDate = new Date();
    this.minDate = new Date('2000-01-01');
    this.tenantForm = this.formBuilder.group({
      TenantName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      TenantAddress: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      RentType: new FormControl('Rent', Validators.required),
      PropertyID: new FormControl(this.propertyId, Validators.required),
      TenantMobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      TenantEmail: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      PropertySize: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.min(1)]),
      MonthlyRent: new FormControl('', [Validators.required, Validators.min(1)]),
      RentedSpace: new FormControl('Whole', Validators.required),
      RentedPart: new FormControl(null),
      AdvanceDeposite: new FormControl(null, [Validators.required, Validators.min(1)]),
      ContractMonths: new FormControl(null, [Validators.required, Validators.min(1)]),
      ContractStartDate: new FormControl('', [Validators.required]),
      ContractEndDate: new FormControl('', Validators.required),
    });
    if (this.isEdit === true) {
      this.setInitialValue();
    }
  }

  dateCheck() {

  }

  valid(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      return false;
    }
    if (e.target.value.length > 7) {
      if (e.keyCode != 8) {
        return false;
      }
    }
  }

  setInitialValue() {
    this.service.viewTenant(this.route.snapshot.params.id).subscribe(Res => {
      this.tenantForm.get('TenantName').setValue(Res.data[0].TenantName);
      this.tenantForm.get('TenantAddress').setValue(Res.data[0].TenantAddress);
      this.tenantForm.get('TenantMobile').setValue(Res.data[0].TenantMobile);
      this.tenantForm.get('TenantEmail').setValue(Res.data[0].TenantEmail);
      this.tenantForm.get('PropertySize').setValue(Res.data[0].PropertySize);
      this.tenantForm.get('MonthlyRent').setValue(Res.data[0].MonthlyRent);
      this.tenantForm.get('RentedSpace').setValue(Res.data[0].RentedSpace);
      this.tenantForm.get('RentedPart').setValue(Res.data[0].RentedPart);
      this.tenantForm.get('AdvanceDeposite').setValue(Res.data[0].AdvanceDeposite);
      this.tenantForm.get('ContractMonths').setValue(Res.data[0].ContractMonths);
      this.tenantForm.get('ContractStartDate').setValue(moment(Res.data[0].ContractStartDate).format('YYYY-MM-DD'));
      this.tenantForm.get('ContractEndDate').setValue(moment(Res.data[0].ContractEndDate).format('YYYY-MM-DD'));
      this.tenantForm.get('PropertyID').setValue(Res.data[0].PropertyID);
      this.tenantForm.get('RentType').setValue(Res.data[0].RentType);
    });
  }
  isValid(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) && event.target.value.length < 10) {
    } else {
      return false;
    }
  }
  GoBack() {
    this.router.navigate(['rent']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.tenantForm.valid && this.isEdit === false) {
      this.isLoading = true;
      this.service.addTenant(this.tenantForm.value, this.propertyId)
        .subscribe(data => {
          this.isLoading = false;
          this.submitted = false;
          this.tenantForm.reset();
          if (data.status === 200) {
            Swal.fire({
              title: 'Added',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: data.error_code,
              text: data.message,
              type: 'error'
            });
          }
        });
    } else if (this.tenantForm.valid && this.isEdit === true) {
      this.isLoading = true;
      this.service.updateTenant(this.tenantForm.value, this.route.snapshot.params.id)
        .subscribe(data => {
          this.isLoading = false;
          if (data.status === 200) {
            Swal.fire({
              title: 'Updated',
              text: data.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload()
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

  get f() { return this.tenantForm.controls; }
}
