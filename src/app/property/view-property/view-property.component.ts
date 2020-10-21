import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  @Input() propertyId: number;
  data: any;
  loading = true;
  constructor(private service: GeneralService) { }

  ngOnInit() {
    this.service.viewproperty(this.propertyId).subscribe(Res => {
      this.data = Res.data;
      this.loading = false;
    });
  }

}
