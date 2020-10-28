import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {GeneralService} from '../../services/general.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  constructor( private route: ActivatedRoute, private service: GeneralService) { }

  ngOnInit() {
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
            }
          }
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
// getLawyers(id) {
//   this.service.getLawyers(id)
//   .pipe(first())
//   .subscribe(
//     data => {
//       if (data.error) {
//         console.log(data.error);
//         return;
//       } else {
//           this.lawyerData.push(data.data[0]);
//       }
//     });
// }
}
