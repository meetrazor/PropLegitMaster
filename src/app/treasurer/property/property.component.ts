import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';


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
  constructor(private service: GeneralService, private route: ActivatedRoute) { }

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
    console.log(id);
  }
}
