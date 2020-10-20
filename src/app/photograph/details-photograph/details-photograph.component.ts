import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-details-photograph',
  templateUrl: './details-photograph.component.html',
  styleUrls: ['./details-photograph.component.scss']
})
export class DetailsPhotographComponent implements OnInit {
  photographList : any = []


  constructor(private generalService : GeneralService) {
    
   }

  ngOnInit() {
    // 1 is Property ID
    this.generalService.listphotograph(1)
    .subscribe((data) => {
      this.photographList = data.filter(e => e.FileType == 'Photo')
      console.log(this.photographList);
    })
  }



}
