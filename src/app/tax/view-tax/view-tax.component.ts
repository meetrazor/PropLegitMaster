import { GeneralService } from './../../services/general.service';
import { Component, Input, OnInit, Output, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-tax',
  templateUrl: './view-tax.component.html',
  styleUrls: ['./view-tax.component.scss']
})
export class ViewTaxComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() propertyID: number;
  constructor(private service: GeneralService, private datepipe: DatePipe) { }
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  @Input() item: any;
  isLoading: boolean;
  ngOnInit() {
    this.isLoading = true;
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/${this.propertyID}/tax/list` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Date', data: 'NextDueDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');

          })
        }, {
          title: 'Amount', data: 'AmountDue',
        }, {
          title: 'Revenue Office', data: 'RevenueOffice',
        }
      ],
      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
    };
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngAfterContentChecked() {
    this.isLoading = false;
  }
}
