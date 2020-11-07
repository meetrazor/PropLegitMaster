import { Component, OnInit, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';
import {GeneralService} from '../../services/general.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { HearingComponent } from '../hearing/hearing.component';
import {LawyerComponent} from '../lawyer/lawyer.component';
import {DocumentsComponent} from '../documents/documents.component';

@Component({
  selector: 'app-details-legal-case',
  templateUrl: './details-legal-case.component.html',
  styleUrls: ['./details-legal-case.component.scss']
})
export class DetailsLegalCaseComponent implements OnInit {
  datasource: any[];
  isLoaded = false;
  hearingData: any[] = [];
  actData: any [] = [];
  lawyerData: any [] = [];
  lawyerList = [];
  constructor( private route: ActivatedRoute, private service: GeneralService, public dialog: MatDialog) {
    this.fetchLawyerlist();
  }

  ngOnInit() {
    this.hearingData = [];
    this.actData = [];
    this.lawyerData = [];
    this.service.listLegalcase(this.route.snapshot.params.id)
    .pipe(first())
    .subscribe(
      data => {
        if (data.error) {
         console.log(data.error);
         return;
        } else {
            this.datasource = data.data;
            for (const item of this.datasource) {
              this.getHearings(item.LegalCaseID);
              this.getLegalcaseActs(item.LegalCaseID);
              this.getLawyers(item.LegalCaseID);
            }
          }
      });
  }

  fetchLawyerlist() {
    this.service.listLawyers().
    subscribe(data => {
      if (data.status == 200) {
      this.lawyerList = data.data;
      } else {
      console.log(data.error);
      }
    });
  }

  openHearingDialog(LegalCaseID) {
    const dialogRef = this.dialog.open(HearingComponent, {
      height: '450px',
      width: '350px',
      data: LegalCaseID,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openLawyerDialog(LegalCaseID) {
    const dialogRef = this.dialog.open(LawyerComponent, {
      height: '350px',
      width: '350px',
      data: LegalCaseID,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDocumentDialog(id) {
    const dialogRef = this.dialog.open(DocumentsComponent, {
      height: '750px',
      width: '400px',
      data: {LegalCaseID: id, PropertyID: this.route.snapshot.params.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
getLegalcaseActs(LegalCaseID) {
  this.service.getLegalcaseActs(LegalCaseID)
  .pipe(first())
  .subscribe(
    data => {
      if (data.error) {
        console.log(data.error);
        return;
      } else {
        this.actData.push(data.data);
      }
    }
  );
}
getHearings(id) {
      this.service.getHearings(id)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            console.log(data.error);
            return;
          } else {
              this.hearingData.push(data.data);
          }
        });
}
getLawyers(id) {
  this.service.getLawyers(id)
  .pipe(first())
  .subscribe(
    data => {
      if (data.error) {
        console.log(data.error);
        return;
      } else {
          this.lawyerData.push(data.data);
      }
    });
}
}
