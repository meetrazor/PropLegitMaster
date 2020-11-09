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
          title: 'Amount Due Date', data: 'NextDueDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');

          })
        }, {
          title: 'Amount Due,', data: 'AmountDue',
        }, {
          title: 'Revenue Office', data: 'RevenueOffice',
        }, {
          title: 'Receipt', data: null,
        }
      ],
      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
      rowCallback(row, data: any) {
        let upload = '';
        if (data.ReceiptID === null) {
          upload += '<a class="btn btn-primary uploadReceipt m-1" title="Upload Receipt" receipt-id="' + data.PropertyTaxID + '">';
          upload += '<i class="mdi mdi-cloud-upload" aria-hidden="false" receipt-id="' + data.PropertyTaxID + '"></i>';
          upload += '</a>';
        }
        $('td:eq(4)', row).html(upload);
      },
      drawCallback: () => {
        $('.uploadReceipt').on('click', (e) => {
          this.onUploadReceipt($(e.target).attr('receipt-id'));
        });
      }
    };
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngAfterContentChecked() {
    this.isLoading = false;
  }
  onUploadReceipt(id) {
    document.getElementById('input').setAttribute('receipt_id', id);
    document.getElementById('input').click();
  }
  upload(e) {
    const id = e.target.attributes.receipt_id.value;
    const file = e.target.files[0];
    console.log(id, file);
  }
}
