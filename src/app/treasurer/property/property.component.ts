import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  stateList: Array<
    { StateName: string, NoOfProperty: number, StateID: number, data: Array<any>, collapsed: number, loading: number }
  >;
  constructor(private service: GeneralService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Properties', path: '/property', active: true }];
    this.route.data.subscribe((res) => {
      this.stateList = res.obj.data;
      this.stateList.map(data => {
        data.collapsed = 0;
        data.loading = 0;
      });
    });
  }

  onShow(event) {
    // tslint:disable-next-line: triple-equals
    const obj = this.stateList.find(x => x.StateID == event);
    obj.loading = 1;
    this.service.getPropertyListByState(event).subscribe((res) => {
      obj.data = res.data;
      obj.collapsed = 1;
      obj.loading = 0;
    });
  }
  onSort(data) {
    console.log(data);
    // resetting other headers
    // this.headers.forEach(header => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });
    // this.service.sortColumn = column;
    // this.service.sortDirection = direction;
  }

}
