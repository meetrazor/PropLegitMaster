import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-legal-case',
  templateUrl: './add-legal-case.component.html',
  styleUrls: ['./add-legal-case.component.scss']
})
export class AddLegalCaseComponent implements OnInit {
  src = '';
  constructor() { }

  ngOnInit() {
    this.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

}
