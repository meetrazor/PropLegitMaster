import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit,AfterViewInit {
  @Input() PropertyId;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  currentUser:any;
  constructor(private service: GeneralService, private datepipe: DatePipe) { 
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `propertyAlerts/tax/Property/${this.PropertyId}` },
      responsive: true,
      columns: [{
          title: 'Due Date', data: 'DueDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          })
        }, {
          title: 'Alert', data: 'PropertyTaxName',
        },{
          title: 'Amount Due (₹)', data: 'AmountDue',
        },{
          title: 'Amount Paid (₹)', data: 'AmountPay',
        },
        {
          title: 'Status', data: 'TaxStatus' ,render:((data)=>{
            if (data === 'Paid') {
              return `<span class="badge badge-success p-1">${data}</span>`;
            }
            return `<span class="badge badge-danger p-1">${data}</span>`;
          })
        },
      ],
      deferRender: true,
      autoWidth: false,
      // columnDefs: [{ targets: [5], visible: false }],

    };
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
}
