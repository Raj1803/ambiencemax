import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';
import { RequestService } from '../Services/RequestService';


@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.page.html',
  styleUrls: ['./all-request.page.scss'],
})
export class AllRequestPage implements OnInit, OnDestroy {

  displayedColumns: string[] = ['req_id', 'Requesttitle', 'Request Type', 'Requester Id' ,
  'Request City', 'requestinitdate'  , 'status',  'view' , 'Approve'];
 
 // public dataSource = this.UserDataService.allRequests;
  public dataSource;

  updatedData = [];

  constructor( public UserDataService: UserDataService, private changeDetectorRefs: ChangeDetectorRef , private RequestService: RequestService) { }

  ngOnInit() { 
    //this.dataSource = this.RequestService.allReqs();

    let response:any = this.RequestService.fetchaallReq().subscribe((response:any)=>{

      this.dataSource = response.req_data;

    });
    

    console.log(this.dataSource);

  }

  ngOnDestroy() {
  }

}
