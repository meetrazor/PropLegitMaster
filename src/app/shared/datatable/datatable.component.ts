import { GeneralService } from './../../services/general.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, AfterViewInit {

  constructor(private service: GeneralService, private router: Router) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @Input() item: any;

  ngOnInit() {
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `property/list/${this.item.StateID}` }, responsive: true,
      columns: [
        {
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }
        }, {
          title: 'Property Name', data: 'PropertyName'
        }, {
          title: 'Location', data: 'PostalAddress'
        }, {
          title: 'Status', data: 'StatusOfElectricity'
        }, {
          title: 'Summary', data: 'Description'
        }, {
          title: 'Action', data: null
        }
      ],
      autoWidth: false,
      columnDefs: [{ width: '18%', targets: [0, 1, 2, 3, 4] }],
      rowCallback(row, data: any) {
        // let deleteBtn = '';
        // deleteBtn += '<a class="btn btn-danger deleteNotice m-1" title="Delete Notice" notice-id="' + data.content_temp_id + '">';
        // deleteBtn += '<i class="fa fa-trash" aria-hidden="false" notice-id="' + data.content_temp_id + '"></i>';
        // deleteBtn += '</a>';

     
        let viewBtn = '<button title="View Property" property-id=' + data.PropertyID;
        viewBtn += ' class="btn btn-primary mx-1 viewProperty" ><i class="mdi mdi-eye-check"></i></button>';
        let editBtn = '<button title="Edit Property" property-id=' + data.PropertyID;
        editBtn += ' class="btn btn-secondary mx-1 editProperty" ><i class="mdi mdi-account-edit"></i></button>';

        $('td:eq(5)', row).html(viewBtn + editBtn);
      },
      drawCallback: () => {
        $('.viewProperty').on('click', (e) => {
          this.onViewProperty($(e.target).attr('property-id'));
        });
        $('.editProperty').on('click', (e) => {
          this.onEditProperty($(e.target).attr('property-id'));
        });
      }
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  onDeleteProperty(id) {
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
      if (result.value) {
        this.service.deleteProperty(id).subscribe((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Deleted!',
              text: res.message,
              type: 'success',
              timer: 2000
            }).then(() => {
              location.reload();
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

  onViewProperty(id) {
    this.router.navigate([`property/view/${id}`]);
  }
  onEditProperty(id) {
    this.router.navigate([`property/edit/${id}`]);
  }
}
