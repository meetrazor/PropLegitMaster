import { Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
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
export class RentComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() propertyID;
  datasource: null;
  isLoaded = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  constructor(private service: GeneralService, private router: Router, private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/${this.propertyID}/rent/list` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Name', data: 'TenantName'
        }, {
          title: 'Amount', data: 'MonthlyRent',
        }, {
          title: 'Tenant Address', data: 'TenantAddress',
        }, {
          title: 'Contract Months', data: 'ContractMonths',
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
          title: 'Receipt', data: null,
        }
      ],

      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1] }],
      rowCallback(row, data: any) {
        let upload = '';
        if (data.ReceiptID === null) {
          upload += '<a class="btn btn-primary uploadReceipt m-1" title="Upload Receipt" receipt-id="' + data.PropertyRentID + '">';
          upload += '<i class="mdi mdi-cloud-upload" aria-hidden="false" receipt-id="' + data.PropertyRentID + '"></i>';
          upload += '</a>';
        }
        $('td:eq(7)', row).html(upload);
      },
      drawCallback: () => {
        $('.uploadReceipt').on('click', (e) => {
          this.onUploadReceipt($(e.target).attr('receipt-id'));
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
  onViewRent(id) { }
  onUploadReceipt(id) {
    this.router.navigate([`rent/uploadreceipt/${this.propertyID}/${id}`]);
  }
}
