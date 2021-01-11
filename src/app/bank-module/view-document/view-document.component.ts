import { DomSanitizer } from '@angular/platform-browser';
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
  isLoading: boolean;
  constructor(private service: GeneralService, private Route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.isLoading = false;
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' },
    { label: 'View Documents', path: '/', active: true }];
    // this.url = this.Route.snapshot.params.url;
    // this.url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // this.filetype = this.Route.snapshot.params.filetype.toLowerCase();
    this.service.getDocument(this.Route.snapshot.params.propertyid, this.Route.snapshot.params.id).subscribe((res) => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res.data[0].FileURL);
      this.isLoading = true;
    });

  }

}
