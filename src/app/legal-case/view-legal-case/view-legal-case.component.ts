import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {GeneralService} from '../../services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-legal-case',
  templateUrl: './view-legal-case.component.html',
  styleUrls: ['./view-legal-case.component.scss']
})
export class ViewLegalCaseComponent implements OnInit {

  constructor(private service: GeneralService) {
  }
    ngOnInit() {
    }
}
