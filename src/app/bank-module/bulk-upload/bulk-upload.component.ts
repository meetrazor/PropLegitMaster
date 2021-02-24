import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';

import { Component, OnInit } from '@angular/core';
import readXlsxFile from 'read-excel-file';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  ResponseData: Array<any>;
  file: Array<any>;
  isLoading: boolean;
  breadCrumbItems: Array<any>;
  currentUser: any;
  constructor(private service: GeneralService, private datepipe: DatePipe, private router: Router) {
    this.currentUser = this.service.getcurrentUser();
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'Bulk Upload Application', path: '/', active: true }];
  }

  ngOnInit() {
    this.ResponseData = [];
  }
  onchange(e) {
    if (this.file.length > 1) {
      this.file = [this.file[0]];

    }
    this.ResponseData = [];

  }
  readFile() {
    this.ResponseData = [];
    readXlsxFile(this.file[0], { dateFormat: 'DD-MM-YYYY' }).then(async (rows) => {
      if (rows.length > 251) {
        Swal.fire({
          title: `Error`,
          text: `You Cannot Upload More Then 250 Applications`,
          type: 'error'
        }).then(() => { this.file = [] })
      } else {
        for (let index = 1; index < rows.length; index++) {
          this.isLoading = true;
          await this.setDataandUpload(rows[index], index).then((data) => {
            this.ResponseData.push(data)
          }).catch((err) => {
            this.ResponseData.push(err)
          })
          this.isLoading = false;
          Swal.fire({
            title: 'File Uploaded Successfully',
            text: 'File Uploaded Successfully , Want to see Log?',
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success mt-2',
            cancelButtonClass: 'btn btn-success ml-2 mt-2',
            buttonsStyling: false
          }).then((result) => {
            if (result.value) {
              return
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                title: 'Upload Another Excel ?',
                text: 'Want To Upload Another Excel?',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success mt-2',
                cancelButtonClass: 'btn btn-success ml-2 mt-2',
                buttonsStyling: false
              }).then((result) => {
                if (result.value) {
                  location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.router.navigate(['loan/applications']);
                }
              });
            }
          });
          // new UploadData(rows[index], this.currentUser.UserID, this.service).getdata()
        }
      }
    })
  }


  onSubmit() {
    if (this.file && this.file.length === 1) {
      const filetype = this.file[0].type;
      if (filetype.toLowerCase() !== 'application/vnd.ms-excel' && filetype.toLowerCase() !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        Swal.fire({
          title: `Error`,
          text: `${this.file[0].name} File Are Not Supported`,
          type: 'error'
        }).then(() => { this.file = [] })
      } else {
        this.readFile()
      }
    } else {
      Swal.fire({
        title: `Please Select File`,
        text: `No file Selected`,
        type: 'error'
      })
    }

  }

  setDataandUpload(row, index) {
    index = index + 1;
    return new Promise((resolve, reject) => {
      if (row.every(x => x == null)) {
        reject({ index, status: 'Error', message: `${index} Row is Empty` })
      } else {
        this.service.GetAllLoanID(row[7], row[8], row[9], row[10], row[17], row[19], row[11]).subscribe((res) => {
          let response = res.data;
          let mendatoryCollumn = ['ApplicantFirstName', 'ApplicantLastName', 'ApplicationNo', 'MobileNo', 'Email', 'StateID', 'DistrictID', 'TalukaID', 'VillageID',
            'LoanPropertyTypeID', 'PropertyAddress', 'BankID', 'BranchCode', 'TypeOfLoan', 'LoanAmount', 'IsOwnerSame']
          let temp = {
            ApplicantFirstName: row[0] ? row[0] : '',
            ApplicantLastName: row[1] ? row[1] : '',
            ApplicationNo: row[2] ? row[2].toString() : '',
            MobileNo: row[3] ? row[3].toString() : '',
            Email: row[4] ? row[4] : '',
            IsOwnerSame: row[5] ? row[5] == 'Yes' ? 'true' : 'false' : 'false',
            PropertyOwners: [],
            StateID: response.StateID ? response.StateID : '',
            DistrictID: response.DistrictID ? response.DistrictID : '',
            TalukaID: response.TalukaID ? response.TalukaID : '',
            VillageID: response.VillageID ? response.VillageID : '',
            LoanPropertyTypeID: response.LoanPropertyTypeID ? response.LoanPropertyTypeID : '',
            PropertyAddress: row[12] ? row[12] : '',
            SurveyNo: row[13] ? row[13].toString() : '',
            CitySurveyNumber: row[14] ? row[14].toString() : '',
            TpNo: row[15] ? row[15].toString() : '',
            FpNo: row[16] ? row[16].toString() : '',
            BankID: response.BankID ? response.BankID : '',
            BranchCode: row[18] ? row[18] : '',
            TypeOfLoan: response.TypeOfLoan ? response.TypeOfLoan : '',
            LoanAmount: row[20] ? row[20] : '',
            IsLien: row[21] ? row[21] == 'Yes' ? 'true' : 'false' : 'false',
            LienPersonName: row[22] ? row[22] : '',
            LienFrom: row[23] ? row[23] : '',
            LienAmount: row[24] ? row[24] : '',
            LienDate: row[25] ? this.datepipe.transform(new Date(Math.round((row[25] - 25569) * 86400 * 1000)), 'yyyy-MM-dd') : '',
            CreatedBy: this.currentUser.UserID
          };
          let ownernames = row[6].split(',');
          ownernames.forEach(element => {
            let owner = { OwnerName: element }
            temp.PropertyOwners.push(owner);
          });
          const emptyobject = Object.keys(temp).filter(k => !temp[k]);
          if (emptyobject.length > 0) {
            const err = emptyobject.filter(k => mendatoryCollumn.includes(k))
            if (err.length > 0) {
              reject({ index, status: 'Error', message: `${err.join(' ,')} Required` })
            } else {
              this.service.AddLoanApplication(temp).subscribe((res) => {
                if (res.status === 200) {
                  resolve({ index, status: 'Success', message: 'Application Added Successfully' })
                }
                else {
                  reject({ index, status: 'Error', message: res.message })
                }
              })
            }
          } else {
            this.service.AddLoanApplication(temp).subscribe((res) => {
              if (res.status === 200) {
                resolve({ index, status: 'Success', message: 'Application Added Successfully' })
              }
              else {
                reject({ index, status: 'Error', message: res.message })
              }
            })
          }
        })
      }
    })

  }
}
// export class UploadData {
//   data: {
//     ApplicantFirstName: String,
//     ApplicantLastName: String,
//     ApplicationNo: Number,
//     MobileNo: Number,
//     Email: String,
//     IsOwnerSame: String,
//     PropertyOwners: Array<{ OwnerName: String }>,
//     StateID: Number,
//     DistrictID: Number,
//     TalukaID: Number,
//     VillageID: Number,
//     LoanPropertyTypeID: Number,
//     PropertyAddress: String,
//     SurveyNo: String,
//     CitySurveyNumber: String,
//     TpNo: String,
//     FpNo: String,
//     BankID: Number,
//     BranchCode: String,
//     TypeOfLoan: Number,
//     LoanAmount: Number,
//     IsLien: String,
//     LienPersonName: String,
//     LienFrom: String,
//     LienAmount: Number,
//     LienDate: String,
//     CreatedBy: Number
//   }
//   constructor(row, userID, private service: GeneralService) {
//     this.service.GetAllLoanID(row[7], row[8], row[9], row[10], row[17], row[19], row[11]).subscribe((res) => {
//       let response = res.data;
//       this.data = {
//         ApplicantFirstName: row[0] ? row[0] : '',
//         ApplicantLastName: row[1] ? row[1] : '',
//         ApplicationNo: row[2] ? row[2] : '',
//         MobileNo: row[3] ? row[3] : '',
//         Email: row[4] ? row[4] : '',
//         IsOwnerSame: row[5] ? row[5] : '',
//         PropertyOwners: [],
//         StateID: response.StateID ? response.StateID : null,
//         DistrictID: response.DistrictID ? response.DistrictID : null,
//         TalukaID: response.TalukaID ? response.TalukaID : null,
//         VillageID: response.VillageID ? response.VillageID : null,
//         LoanPropertyTypeID: response.LoanPropertyTypeID ? response.LoanPropertyTypeID : null,
//         PropertyAddress: row[12] ? row[12] : '',
//         SurveyNo: row[13] ? row[13] : '',
//         CitySurveyNumber: row[14] ? row[14] : '',
//         TpNo: row[15] ? row[15] : '',
//         FpNo: row[16] ? row[16] : '',
//         BankID: response.BankID ? response.BankID : null,
//         BranchCode: row[18] ? row[18] : '',
//         TypeOfLoan: response.TypeOfLoan ? response.TypeOfLoan : null,
//         LoanAmount: row[20] ? row[20] : '',
//         IsLien: row[21] ? row[21] : '',
//         LienPersonName: row[22] ? row[22] : '',
//         LienFrom: row[23] ? row[23] : '',
//         LienAmount: row[24] ? row[24] : '',
//         LienDate: row[25] ? row[25] : '',
//         CreatedBy: userID
//       };
//       let ownernames = row[6].split(',');
//       ownernames.forEach(element => {
//         let owner = { OwnerName: element }
//         this.data.PropertyOwners.push(owner);
//       });
//     })
//   }
//   async getdata() {

//   }

// }
