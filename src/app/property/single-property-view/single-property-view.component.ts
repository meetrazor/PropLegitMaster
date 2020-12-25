import { GeneralService } from './../../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-property-view',
  templateUrl: './single-property-view.component.html',
  styleUrls: ['./single-property-view.component.scss']
})
export class SinglePropertyViewComponent implements OnInit {
  breadCrumbItems: Array<any>;

  constructor(private route: ActivatedRoute, private service: GeneralService) { }
  propertyID: number;
  isloading: boolean;
  data: any;
  count: number;
  ngOnInit() {
    this.count = 0;
    this.isloading = true;
    this.propertyID = this.route.snapshot.params.id;
    this.service.viewproperty(this.propertyID).subscribe((res) => {
      this.data = res.data;
      this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: '/property' },
      { label: `${this.data.PropertyName}`, path: '/property', active: true }];
      this.isloading = false;
    });

  }
  refresh() {
    this.count++;
  }
}
