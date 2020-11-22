import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';


@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.page.html',
  styleUrls: ['./all-request.page.scss'],
})
export class AllRequestPage implements OnInit, OnDestroy {

  displayedColumns: string[] = ['req_id', 'Requesttitle', 'Request Type', 'Requester Id' ,
  'Request City', 'requestinitdate'  , 'status',  'view' , 'Approve'];
 
  public dataSource = this.UserDataService.desiredRequests;

  updatedData = [];

  constructor( public UserDataService: UserDataService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {

    console.log(this.dataSource); 
  }

  ngOnDestroy() {
  }

}
