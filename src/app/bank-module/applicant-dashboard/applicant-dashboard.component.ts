
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  reviewd = 0;
  meth: any;
  totaldocument = 0;
  pending = 0;
  received = 0;
  dtOptions: DataTables.Settings = {};
  propertyDocumentData: any;
  loaded: boolean;
  applicationData: any;
  revenueRadialChart: any;

  constructor(private service: GeneralService, private Route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.loaded = false;
    this.breadCrumbItems = [{ label: 'Title Search', path: '/' }, { label: 'Dashboard', path: '/', active: true }];
    this.service.GetApplicationInformation(this.Route.snapshot.params.id).subscribe((res) => {
      this.applicationData = res.data[0];
      this.service.GetDocumentList(this.Route.snapshot.params.id).subscribe((Response) => {
        this.propertyDocumentData = Response.data;
        if (this.propertyDocumentData.length > 0) {
          this.propertyDocumentData.filter((data) => {
            this.totaldocument++;
            if (data.FileURL && data.Status === 'Under Review') {
              this.received++;
            } else if (data.FileURL && data.Status !== 'Under Review') {
              this.reviewd++;
            } else if (!data.FileURL) {
              this.pending++;
            }
          });
        }
        this.LoadChart();

        this.loaded = true;
      });
    });
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/Documents/AppID/${this.Route.snapshot.params.id}` }, responsive: true,
      columns: [{
        title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
          return meta.row + 1;
        }
      }, {
        title: 'Document',
        data: 'DocumentName',
      }, {
        title: 'Status',
        data: 'Status'
      }, {
        title: 'Action',
        data: null
      }
      ], rowCallback(row, data: any) {
        let btn = '';
        if (data.FileURL === null) {
          btn += '<a href="javascript:void(0)" class="uploadDocument m-1" title="Upload Document" receipt-id="' + data.ID + '">';
          btn += '<i class="mdi mdi-file-upload-outline font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
          btn += '</a>';
          btn += '<a href="javascript:void(0)" class="requestDocument m-1" title="Request this Document" receipt-id="' + data.ID + '">';
          btn += '<i class="mdi mdi mdi-file-question font-18 text-secondary" aria-hidden="false" receipt-id="' + data.ID + '"></i>';
          btn += '</a>';
        } else if (data.FileURL !== null) {
          btn += '<a href="javascript:void(0)" class="viewDocument m-1" title="View Document" receipt-id="' + data.DocumentID + '">';
          btn += '<i class="mdi mdi-eye font-18 text-secondary" aria-hidden="false" receipt-id="' + data.DocumentID + '"></i>';
          btn += '</a>';
        }
        $('td:eq(3)', row).html(btn);
      }, drawCallback: () => {
        $('.uploadDocument').on('click', (e) => {
          this.onUploadDocument();
        });
        $('.viewDocument').on('click', (e) => {
          this.onViewDocument($(e.target).attr('receipt-id'));
        });
        $('.requestDocument').on('click', (e) => {
          this.onRequestingDocument($(e.target).attr('receipt-id'));
        });
      }
    };
  }
  onUploadDocument() {
    this.router.navigate(['loan/uploaddocument/' + this.applicationData.AppID]);
  }
  onViewDocument(id) {
    // this.router.navigate(['loan/viewdocument/' + this.applicationData.PropertyID + '/' + id]);
    this.service.getDocument(this.applicationData.PropertyID, id).subscribe((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        if (data) {
          if (data.FileType === 'DOC') {
            window.location.href = data.FileURL;
          } else {
            this.router.navigate(['loan/viewdocument', data.FileURL, data.FileType]);
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
  onRequestingDocument(id) {
    console.log('Requesting ' + id);

  }
  LoadChart() {
    this.revenueRadialChart = {
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%',
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              fontSize: '24px',
              color: 'rgb(29, 173, 56)',
              offsetY: 10,
              formatter: (val) => {
                return val + '';
              }
            }
          }
        }
      },
      colors: ['rgb(29, 173, 56)'],
      series: [this.totaldocument ? ((this.reviewd / this.totaldocument) * 100).toFixed() : 0],
      stroke: {
        lineCap: 'round',
      },
    };
  }
}
