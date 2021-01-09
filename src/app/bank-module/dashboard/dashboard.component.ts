import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  allLoanTypes = ['Personal Loan', 'Auto Loan', 'Home Loan', 'Business Loan', 'MSME Loan', 'Industrial Loan', 'Mudra Loan'];
  allStatus = ['Applications Received', 'Pending Title Search', 'Pending Valuation', 'Pending Review', 'Pending Lawyer Assignment'];
  allProperty = ['Buildings', 'Open Land', 'Bungalows', 'Flats', 'Factory'];
  allBanks = ['State Bank of India', 'Bank of Baroda', 'Union Bank of India', 'Canara Bank'];
  allIndia = ['Maharashtra', 'Punjab', 'Gujarat'];
  selected: any;
  hidden: boolean;
  ChartType: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  ChartType2: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  ChartType3: {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
  };
  // tslint:disable-next-line: variable-name
  user_type: number;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.selected = '7/1/2020-7/8/2020';
    this.hidden = true;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/loan' }];
    this.ChartType = {
      type: 'donut',
      height: 260,
      series: [42, 30, 28],
      labels: ['5 Lacs to 10 Lacs', 'Below 5 Lacs', 'Above 10 Lacs'],
      colors: ['#26c6e1', '#6658dd', '#ebeff2'],
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      }, options: {
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        legend: {
          display: true
        }
      }
    };
    this.ChartType2 = {
      type: 'donut',
      height: 260,
      series: [6000, 7000, 6500, 5000, 8000, 17512],
      labels: ['Business', 'Home', 'Auto', 'Personal', 'Mudra', 'MSME'],
      colors: ['#26c6e1', '#6658dd', '#ebeff2', '#d9847e', '#9483de', '#7fe393'],
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      }, options: {
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        legend: {
          display: true
        }
      }
    };
    this.ChartType3 = {
      type: 'donut',
      height: 260,
      series: [400, 500, 200, 314, 314],
      labels: ['Buildings', 'Open Land', 'Bungalows', 'Flats', 'Factory'],
      colors: ['#26c6e1', '#6658dd', '#ebeff2', '#d9847e', '#9483de'],
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      }, options: {
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        legend: {
          display: true
        }
      }
    };
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
    // this.router.navigate(['/titlesearch/dashboard']);
  }
}
