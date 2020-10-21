import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-details-photograph',
  templateUrl: './details-photograph.component.html',
  styleUrls: ['./details-photograph.component.scss']
})
export class DetailsPhotographComponent implements OnInit {
  photographList: any = [];
  @Input() propertyId: number;

  constructor(private generalService: GeneralService) {

  }

  ngOnInit() {
    // 1 is Property ID
    this.generalService.listphotograph(this.propertyId)
      .subscribe((data) => {
        this.photographList = data.filter(e => e.FileType === 'Photo');
      });
  }



}
