import { ɵAnimationGroupPlayer } from '@angular/animations';
import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {

  url: string;
  filetype: string;
  constructor(private route: ActivatedRoute) {
    this.url = this.route.snapshot.params.url;
    this.filetype = this.route.snapshot.params.filetype.toLowerCase();
  }
  ngOnInit() {
  }
}
