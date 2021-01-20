import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  breadCrumbItems: Array<{}>;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  isLoading: boolean;
  currentAppId;
  // tslint:disable-next-line: variable-name
  user_type: number;
  fileExtension = '';
  submitted: boolean;
  @Input() fromDate: Date;
  PVRForm: FormGroup;
  currentUser: any;
  @ViewChild('uploadPVR', { static: true }) uploadPVRModal;
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
  constructor(
    private router: Router, private service: GeneralService, private renderer: Renderer2,
    private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.isLoading = false;
    this.submitted = false;
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' },
    { label: 'Applications', path: '/', active: true }];
    this.currentUser = this.service.getcurrentUser();
    this.selected = '7/1/2020-7/8/2020';
    this.hidden = true;
    this.dtOptions = {
      ajax: { url: this.service.GetBaseUrl() + `loan/application/View/BankManager/${this.currentUser.UserID}` }, responsive: true,
      columns: [{
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
        title: 'Status',
        data: 'ApplicationStatus'
      }, {
        title: 'Amount (₹)',
        data: 'LoanAmount'
      }, {
        title: 'Action',
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
        title: 'Status',
        data: 'ApplicationStatus'
      }, {
        title: 'Amount (₹)',
        data: 'LoanAmount'
      }, {
        title: 'Action',
        render: (data: any, type: any, full: any) => {
          // generate PDF
          if (full.PVRID && !full.PVRDocumentID) {
            return `<a class="btn text-primary" title="Generate PVR Report"
            PVRappID = "${full.AppID}"><i class="dripicons-document-edit font-18 text-secondary"
             PVRappID = "${full.AppID}" aria-hidden="false"></i></a>
             <a class="btn text-primary" title="Upload PVR Report"
            UploadPVRappID = "${full.AppID}"><i class="mdi mdi-file-upload-outline font-18 text-secondary"
            UploadPVRappID = "${full.AppID}" aria-hidden="false"></i></a>`;
            // Upload PDF
          } else if (full.PVRID && full.PVRDocumentID) {
            return `<a class="btn text-primary" title="View PVR"
            viewPVRID = "${full.PVRDocumentID}" propertyID ="${full.PropertyID}" ><i class="mdi mdi-eye font-18 text-secondary"
            viewPVRID = "${full.PVRDocumentID}" propertyID ="${full.PropertyID}" aria-hidden="false"></i></a>
            <a class="btn text-primary" title="Upload All Documents"
            UploadDocAppID = "${full.AppID}"><i class="mdi mdi-file-document-box-multiple font-18 text-secondary"
            UploadDocAppID = "${full.AppID}" aria-hidden="false"></i></a>`;
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
      if (event.target.hasAttribute('UploadDocAppID')) {
        this.service.ForDemo(event.target.getAttribute('UploadDocAppID')).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: res.message,
            type: 'success',
            timer: 2000
          }).then(() => {
            this.service.changeStatus(event.target.getAttribute('UploadDocAppID'), 'Search In Complete').subscribe(() => {
              location.reload();
            });
          });
        });
      }
    });
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
        this.router.navigate(['/loan/GeneratePVR/' + event.target.getAttribute('PVRappID')]);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('UploadPVRappID')) {
        if (!this.modalService.hasOpenModals()) {
          this.currentAppId = event.target.getAttribute('UploadPVRappID');
          this.initPVRForm();
          this.modalService.open(this.uploadPVRModal);
        }
        // console.log(event.target.getAttribute('UploadPVRappID'));
        // this.router.navigate(['/loan/generatePVR/' + event.target.getAttribute('PVRappID')]);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('viewPVRID') && event.target.hasAttribute('propertyID')) {
        this.router.navigate(['loan/viewdocument/' + event.target.getAttribute('propertyID')
          + '/' + event.target.getAttribute('viewPVRID')]);
        // this.router.navigate(['/loan/generatePVR/' + event.target.getAttribute('PVRappID')]);
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.PVRForm.valid) {
      this.isLoading = true;
      this.service.UploadPVR(this.currentAppId, this.prepareSave())
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.submitted = false;
            this.resetForm();
            if (data.error) {
              Swal.fire({
                title: data.error_code,
                text: data.error,
                type: 'error'
              });
              return;
            } else {
              Swal.fire({
                title: 'Success',
                text: data.message,
                type: 'success',
                timer: 2000
              }).then(() => {
                this.service.changeStatus(this.currentAppId, 'Assign Lawyer Pending').subscribe(() => {
                  location.reload();
                  this.PVRForm.controls.uploadfile.setValue([]);
                });
              });
            }
          });
    }
  }
  get f() { return this.PVRForm.controls; }
  onchange(e) {
    if (e && e.length > 0) {
      const file = e[0];
      let fileName = file.name;
      fileName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
      fileName = fileName.length > 25 ? fileName.substring(0, 25) : fileName;
      const filetype = file.type;
      const fileExtension = file.name.split('.').pop();
      this.setform(fileName, filetype, fileExtension);
    } else {
      this.PVRForm.controls.FileType.setValue('');
      this.PVRForm.controls.FileName.setValue('');
      this.PVRForm.controls.Description.setValue('');
      this.fileExtension = '';
    }
  }
  setform(fileName, filetype, extension) {
    if ((filetype.toLowerCase() === 'image/jpeg' && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg')) ||
      (filetype.toLowerCase() === 'image/gif' && extension.toLowerCase() === 'gif') ||
      (filetype.toLowerCase() === 'image/png' && extension.toLowerCase() === 'png')) {
      this.PVRForm.controls.FileType.setValue('Photo');
      this.PVRForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else if ((filetype.toLowerCase() === 'application/pdf' && extension.toLowerCase() === 'pdf')) {
      this.PVRForm.controls.FileType.setValue('PDF');
      this.PVRForm.controls.FileName.setValue(fileName);
      this.fileExtension = extension.toLowerCase();
    } else {
      this.PVRForm.controls.uploadfile.setValue([]);
      Swal.fire({
        title: `Error`,
        text: `${extension} File Are Not Supported`,
        type: 'error'
      });
    }
  }
  prepareSave(): any {
    const input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by
    // looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('FileName', this.PVRForm.get('FileName').value + '.' + this.fileExtension);
    input.append('FileType', this.PVRForm.get('FileType').value);
    input.append('Description', this.PVRForm.get('Description').value);
    input.append('uploadfile', (this.PVRForm.get('uploadfile').value)[0]);
    input.append('CreatedBy', (this.PVRForm.get('CreatedBy').value));
    input.append('UserID', (this.PVRForm.get('UserID').value));
    return input;
  }
  resetForm() {
    this.f.FileName.reset();
    this.f.FileType.reset();
    this.f.Description.reset();
    this.f.uploadfile.reset();
    this.f.uploadfile.setValue([]);
  }
  initPVRForm() {
    this.PVRForm = this.formBuilder.group({
      FileName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      FileType: new FormControl(null, Validators.required),
      Description: new FormControl(null),
      uploadfile: new FormControl(null, Validators.required),
      CreatedBy: new FormControl(this.currentUser.UserID, Validators.required),
      UserID: new FormControl(this.currentUser.UserID, Validators.required),
    });
    this.PVRForm.controls.FileType.disable();
  }
}
