import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-details-photograph',
  templateUrl: './details-photograph.component.html',
  styleUrls: ['./details-photograph.component.scss']
})
export class DetailsPhotographComponent implements OnInit {
  photographList: any = [];
  videoList: any = [];
  audioList: any = [];
  @Input() propertyId: number;
  isLoading: boolean;
  constructor(private generalService: GeneralService) {

  }

  ngOnInit() {
    this.isLoading = true;
    // 1 is Property ID
    this.generalService.listphotograph(this.propertyId)
      .subscribe((data) => {
        this.isLoading = false;
        this.photographList = data.filter(e => e.FileType === 'Photo');
        this.videoList = data.filter(e => e.FileType === 'Video');
        this.audioList = data.filter(e => e.FileType === 'Audio');
      });
  }



}
