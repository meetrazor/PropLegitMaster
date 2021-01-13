
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  breadCrumbItems: any;
  currentUser: any;
  dtOptions: DataTables.Settings = {};
  constructor(private service: GeneralService, private datepipe: DatePipe) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'Assignments', path: '/loan/assignment', active: true }];
  }

  ngOnInit() {
    this.currentUser = this.service.getcurrentUser();
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/View/Lawyer/${this.currentUser.UserID}` }, responsive: true,
      columns: [{
        title: 'Applicant',
        data: '', render: (data, type, row) => {
          return `${row.FirstName} ${row.LastName}`;
        }
      }, {
        title: 'Loan',
        data: 'Type_of_Loan'
      }, {
        title: 'Amount',
        data: 'LoanAmount'
      }, {
        title: 'Documents',
        render: (data, type, row) => {
          return `<a class="btn text-primary" title="View Documents"
          viewID = "${row.AppID}"><i class="mdi mdi-eye font-18 text-secondary" viewID = "${row.AppID}" aria-hidden="false"></i></a>
          <a class="btn text-primary" title="Upload Documents"
          UploadID = "${row.AppID}"><i class="mdi mdi-file-upload-outline font-18 text-secondary"
          UploadID = "${row.AppID}" aria-hidden="false"></i></a>`;
        }
      }, {
        title: 'Status',
        data: 'ApplicationStatus'
      }, {
        title: 'Action',
        data: null, render: (data, type, row) => {
          return `<a class="btn btn-xs btn-light" title="Continue Work"
          OpenID = "${row.AppID}"><i class="mdi mdi-pencil font-18 text-secondary" OpenID = "${row.AppID}" aria-hidden="false"></i></a>`;
        }
      }, {
        title: 'Date',
        data: 'CreatedAt',
        render: (data, type, row) => {
          return this.datepipe.transform(data, 'MMM dd,yyyy');
        }
      }, {
        title: 'Bank Name',
        data: 'BankName'
      }
      ],
    };
  }

}
