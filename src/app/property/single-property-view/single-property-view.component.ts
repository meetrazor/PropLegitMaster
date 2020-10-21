import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-property-view',
  templateUrl: './single-property-view.component.html',
  styleUrls: ['./single-property-view.component.scss']
})
export class SinglePropertyViewComponent implements OnInit {
  breadCrumbItems: Array<any>;
  constructor(private route: ActivatedRoute) { }
  propertyID: number;
  ngOnInit() {
    this.propertyID = this.route.snapshot.params.id;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: '/property' },
    { label: `${this.propertyID}`, path: '/property', active: true }];
  }

}
