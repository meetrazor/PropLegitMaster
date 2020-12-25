import { Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentChecked, SimpleChanges, OnChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { GeneralService } from '../../services/general.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked {
  @Input() propertyID;
  @Input() refresh;
  datasource: null;
  showntable: boolean;
  tenatID: number;
  isLoaded = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  toady: string;
  tanentData: any;
  constructor(private service: GeneralService, private router: Router, private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.showntable = false;
    this.toady = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/${this.propertyID}/tenant/list?${this.toady}` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Name', data: 'TenantName'
        }, {
          title: 'Amount', data: 'MonthlyORDailyRent',
        }, {
          title: 'Tenant Address', data: 'TenantAddress',
        }, {
          title: 'Rent Type', data: 'RentType',
        },
        {
          title: 'Contract Start Date', data: 'ContractStartDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          })
        }, {
          title: 'Rent Due Date:', data: 'ContractEndDate', render: ((data) => {
            return this.datepipe.transform(data, 'MMM, dd yyyy');
          })
        }, {
          title: 'Action', data: null,
        }
      ],

      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
      rowCallback(row, data: any) {
        let upload = '';
        // if (data.ReceiptID === null) {
        upload += '<a class="btn btn-primary ViewTanent m-1" title="View Tanent" receipt-id="' + data.PropertyTenantID + '">';
        upload += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.PropertyTenantID + '"></i>';
        upload += '</a>';
        // } else if (data.ReceiptID !== null) {
        // upload += '<a class="btn btn-secondary viewReceipt m-1" title="View Receipt" receipt-id="' + data.ReceiptID + '">';
        // upload += '<i class="mdi mdi-eye" aria-hidden="false" receipt-id="' + data.ReceiptID + '"></i>';
        // upload += '</a>';
        // }
        $('td:eq(7)', row).html(upload);
      },
      drawCallback: () => {
        // $('.uploadReceipt').on('click', (e) => {
        //   this.onUploadReceipt($(e.target).attr('receipt-id'));
        //   this.showntable = true;
        // });
        $('.ViewTanent').on('click', (e) => {
          this.onViewRent(+$(e.target).attr('receipt-id'));

        });
      }
    };

    // this.service.listTenant(this.propertyID)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.error) {
    //         Swal.fire({
    //           title: data.error_code,
    //           text: data.message,
    //           type: 'error'
    //         });
    //         return;
    //       } else {
    //         this.datasource = data.data;
    //         this.isLoaded = true;
    //       }
    //     });
  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngAfterContentChecked() {
    this.isLoaded = true;
  }
  onDeleteTenant(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success mt-2',
      cancelButtonClass: 'btn btn-danger ml-2 mt-2',
      buttonsStyling: false
    }).then((result) => {
      console.log(result);
      if (result.value) {
        this.service.deleteTenant(id).subscribe((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Deleted!',
              text: res.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
              // this.router.navigate(['rent']);
            });
          } else {
            Swal.fire({
              title: res.error_code,
              text: res.message,
              type: 'error'
            });
          }
        }, (err) => {
          Swal.fire({
            title: 'Oops Something Wrong while deleting',
            text: err,
            type: 'error'
          });
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Opration Cancelled by User!',
          type: 'error'
        });
      }
    });
  }
  onSort(data) { }
  onDeleteRent(id) { }
  onViewRent(id) {
    this.isLoaded = false;
    this.service.getRentList(id).subscribe((res) => {
      this.isLoaded = true;
      this.tanentData = res.data.tenantinfo;
      this.tenatID = id;
      this.showntable = true;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.refresh.firstChange) {
      this.rerender();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onUploadReceipt(id) {
    this.router.navigate([`rent/uploadreceipt/${this.propertyID}/${id}`]);
  }
  onViewReceipt(id) {
    this.service.getDocument(this.propertyID, id).subscribe((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          if (data.FileType === 'DOC') {
            window.location.href = data.FileURL;
          } else {
            this.router.navigate(['/property/ViewPdf', data.FileURL, data.FileType]);
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something\'s Wrong',
            type: 'error'
          });
        }
      }
    });
  }
}
