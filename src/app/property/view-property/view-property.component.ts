import { GeneralService } from 'src/app/services/general.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  @Input() propertyId: number;
  @Input() data: any;
  loading = true;
  src = '';
  constructor(private service: GeneralService, private router: Router) { }

  ngOnInit() {
    this.service.viewproperty(this.propertyId).subscribe(Res => {
      this.data = Res.data;
      this.loading = true;
    });
    this.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }
  GoBack() {
    this.router.navigate(['property']);
  }
}
