import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
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
  hidden: boolean;
  @ViewChild('dp', { static: true }) datePicker: any;
  allLoanTypes = ['Personal Loan', 'Auto Loan', 'Home Loan', 'Business Loan', 'MSME Loan', 'Industrial Loan', 'Mudra Loan'];
  allStatus = ['Received', 'Pending Title Search', 'Pending Valuation', 'Pending Review', 'Pending Lawyer Assignment'];
  allApplicationNos = ['1', '2', '3', '4', '5', '6'];
  tabledata: any;
  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Loan', path: '/' }, { label: 'Application', path: '/', active: true }];
    this.currentUser = this.service.getcurrentUser();
    this.selected = '7/1/2020-7/8/2020';
    this.hidden = true;
    this.dtOptions = {
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
        data: null, render: (data, type, row) => {
          return `<a href="loan/title-search/${row.AppID}">View</a>`;
        }
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

}
