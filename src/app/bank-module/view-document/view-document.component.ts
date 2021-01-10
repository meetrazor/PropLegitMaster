import { ActivatedRoute } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  breadCrumbItems: any;
  url: any;
  filetype: string;
  constructor(private service: GeneralService, private Route: ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'View Documents', path: '/', active: true }];
    this.url = this.Route.snapshot.params.url;
    // this.url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    this.filetype = this.Route.snapshot.params.filetype.toLowerCase();
  }

}
