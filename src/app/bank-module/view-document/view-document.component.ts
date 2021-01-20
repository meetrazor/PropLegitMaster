import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  breadCrumbItems: any;
  url: any;
  data: any;
  currentUser: any;
  filetype: string;
  isLoading: boolean;
  constructor(private service: GeneralService, private Route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.currentUser = this.service.getcurrentUser();
  }

  ngOnInit() {
    this.isLoading = true;
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Applications', path: 'loan/applications' },
    { label: 'View Documents', path: '/', active: true }];
    // this.url = this.Route.snapshot.params.url;
    // this.url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // this.filetype = this.Route.snapshot.params.filetype.toLowerCase();
    this.service.getDocument(this.Route.snapshot.params.propertyid, this.Route.snapshot.params.id).subscribe((res) => {
      this.url = res.data[0].FileURL;
      this.data = res.data[0];
      this.filetype = res.data[0].FileType;
      this.isLoading = false;
    });

  }
  reviewed() {
    this.isLoading = true;
    this.service.MarkAsReviewed(this.Route.snapshot.params.propertyid, this.Route.snapshot.params.id).subscribe((res) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Success',
        text: 'Document is Reviewed',
        type: 'success'
      }).then(() => {
        location.reload();
      });
    });
  }
}
