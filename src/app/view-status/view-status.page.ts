import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Services/RequestService';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.page.html',
  styleUrls: ['./view-status.page.scss'],
})
export class ViewStatusPage implements OnInit {

  constructor(public RequestService:RequestService) { }

  ngOnInit() {
  }

}
