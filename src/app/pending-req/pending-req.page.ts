import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';
import { RequestService } from '../Services/RequestService';
 
@Component({
  selector: 'app-pending-req',
  templateUrl: './pending-req.page.html',
  styleUrls: ['./pending-req.page.scss'],
})
export class PendingReqPage implements OnInit {

  // public dataSource = this.UserDataService.pendingRequests;
  public dataSource;

  updatedData = [];

  constructor(public UserDataService: UserDataService, private changeDetectorRefs: ChangeDetectorRef, private RequestService: RequestService) { }

  ngOnInit() {


    let response:any = this.RequestService.fetchpendingReq().subscribe((response:any)=>{

      this.dataSource = response.req_data;

    });

    console.log(this.dataSource); 




    if(this.UserDataService.userId==1){

    }
    if (this.UserDataService.userRole == null || this.UserDataService.allRequests.length === 0) {
      this.UserDataService.Data = JSON.parse(localStorage.getItem('userData'));
      if (this.UserDataService.Data !== null) {
        console.log('User Data Fetched from Local storage!');
        this.UserDataService.pendingRequests = this.UserDataService.Data.pendingReq;
        this.UserDataService.closedRequests = this.UserDataService.Data.closedReq;
        this.UserDataService.openRequests = this.UserDataService.Data.openReq;
        this.UserDataService.email = this.UserDataService.Data.email;
        this.UserDataService.password = this.UserDataService.Data.password;
        this.UserDataService.allRequests = this.UserDataService.Data.Requests;
        this.UserDataService.userRole = this.UserDataService.Data.userRole;
        this.UserDataService.userId = this.UserDataService.Data.userId;
        this.UserDataService.reqStats = this.UserDataService.Data.reqStats;
        this.UserDataService.reqOffset = this.UserDataService.Data.reqOffset;
        this.UserDataService.hId = this.UserDataService.Data.hId;
      } else {
        console.log('No User in session!');
        // this.router.navigateByUrl('/');
      }
    }
    
  }

  ngOnDestroy() {
  }

}
