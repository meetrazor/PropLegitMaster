import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  breadCrumbItems: any;
  isLoading: boolean;
  loanTypes: any;
  public loan: FormGroup;
  constructor(private service: GeneralService, private Fb: FormBuilder) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'Add New Application', path: '/loan/addapplication', active: true }];
    this.isLoading = false;
  }

  ngOnInit() {
    this.service.GetLoanTypes().subscribe((res) => {
      console.log(res.data);
    });
    this.loan = this.Fb.group({
      OwnerShip: this.Fb.array([
      ])
    });
  }

}
