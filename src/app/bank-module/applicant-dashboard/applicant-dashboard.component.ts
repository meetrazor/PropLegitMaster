import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  revenueRadialChart = {
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
    series: [81],
    stroke: {
      lineCap: 'round',
    },
  };
  revenueRadialChart2 = {
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
            color: 'rgb(173, 29, 49)',
            offsetY: 10,
            formatter: (val) => {
              return val + '';
            }
          }
        }
      }
    },
    colors: ['rgb(173, 29, 49)'],
    series: [18],
    stroke: {
      lineCap: 'round',
    },
  };
  revenueRadialChart3 = {
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
            color: 'rgb(115, 109, 109)',
            offsetY: 10,
            formatter: (val) => {
              return val + '';
            }
          }
        }
      }
    },
    colors: ['rgb(115, 109, 109)'],
    series: [0],
    stroke: {
      lineCap: 'round',
    },
  };
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Title Search', path: '/' }, { label: 'Dashboard', path: '/', active: true }];
  }

}
