import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  breadCrumbItems: Array<{}>;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  user_type: number;
  @Input() fromDate: Date;
  currentUser: any;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  selected: any;
  dtOptions: DataTables.Settings = {};
  dtOptionsforPVR: DataTables.Settings = {};
  hidden: boolean;
  @ViewChild('dp', { static: true }) datePicker: any;
  allLoanTypes = ['Personal Loan', 'Auto Loan', 'Home Loan', 'Business Loan', 'MSME Loan', 'Industrial Loan', 'Mudra Loan'];
  allStatus = ['Received', 'Pending Title Search', 'Pending Valuation', 'Pending Review', 'Pending Lawyer Assignment'];
  allApplicationNos = ['1', '2', '3', '4', '5', '6'];
  tabledata: any;
  constructor(private router: Router, private service: GeneralService, private renderer: Renderer2) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Loan', path: '/' }, { label: 'Application', path: '/', active: true }];
    this.currentUser = this.service.getcurrentUser();
    this.selected = '7/1/2020-7/8/2020';
    this.hidden = true;
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/View/BankManager/${this.currentUser.UserID}` }, responsive: true,
      columns: [{
        title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
          return meta.row + 1;
        }
      }, {
        title: 'Name',
        data: '', render: (data, type, row) => {
          return `${row.FirstName} ${row.LastName}`;

        }
      }, {
        title: 'Loan Type',
        data: 'Type_of_Loan'
      }, {
        title: 'Bank Name',
        data: 'BankName'
      }, {
        title: 'Branch Name',
        data: 'BranchCode'
      }, {
        title: 'Amount (₹)',
        data: 'LoanAmount'
      }, {
        title: 'Document',
        data: null, render: (data, type, row) => {
          return `<a class="btn text-primary" title="View Application"
          viewID = "${row.AppID}"><i class="mdi mdi-eye font-18 text-secondary" viewID = "${row.AppID}" aria-hidden="false"></i></a>`;
        }
      }
      ],
    };
    this.dtOptionsforPVR = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/View/Admin/${this.currentUser.UserID}` }, responsive: true,
      columns: [{
        title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
          return meta.row + 1;
        }
      }, {
        title: 'Name',
        data: '', render: (data, type, row) => {
          return `${row.FirstName} ${row.LastName}`;

        }
      }, {
        title: 'Loan Type',
        data: 'Type_of_Loan'
      }, {
        title: 'Bank Name',
        data: 'BankName'
      }, {
        title: 'Branch Name',
        data: 'BranchCode'
      }, {
        title: 'Amount (₹)',
        data: 'LoanAmount'
      }, {
        title: 'Document',
        render: (data: any, type: any, full: any) => {
          // generate PDF
          if (full.PVRID && !full.PVRDocumentID) {
            return `<a class="btn text-primary" title="Generate PVR Report"
            PVRappID = "${full.AppID}"><i class="dripicons-document-edit font-18 text-secondary"
             PVRappID = "${full.AppID}" aria-hidden="false"></i></a>`;
            // Upload PDF
          } else if (full.PVRID && full.PVRDocumentID) {
            return `<a class="btn text-primary" title="Upload PVR Report"
            UploadPVRappID = "${full.AppID}"><i class="mdi mdi-file-upload-outline font-18 text-secondary"
            UploadPVRappID = "${full.AppID}" aria-hidden="false"></i></a>`;
            // view PDF
          } else {
            return `<a class="btn text-primary" title="Add PVR Report"
            appID = "${full.AppID}"><i class="mdi mdi-plus-box font-18 text-secondary"
             appID = "${full.AppID}" aria-hidden="false"></i></a>`;
          }
        }
        // data: null, render: (data, type, row) => {
        //   return `<a routerLink="loan/PVRreport/${row.AppID}">Add PVR</a>`;
        // }
      }
      ],
    };
    // this.tabledata = data;
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();

      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });

      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  redirect() {
    this.router.navigate(['/loan/addapplication']);
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('appID')) {
        this.router.navigate(['/loan/PVRreport/' + event.target.getAttribute('appID')]);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('viewID')) {
        this.router.navigate(['/loan/title-search/' + event.target.getAttribute('viewID')]);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('PVRappID')) {
        console.log(event.target.getAttribute('PVRappID'));
        // this.router.navigate(['/loan/generatePVR/' + event.target.getAttribute('PVRappID')]);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('UploadPVRappID')) {
        console.log(event.target.getAttribute('UploadPVRappID'));
        // this.router.navigate(['/loan/generatePVR/' + event.target.getAttribute('PVRappID')]);
      }
    });
  }
}
