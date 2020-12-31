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
  public userId;
  public filterTerm: string;

  updatedData = [];

  constructor(public UserDataService: UserDataService, private changeDetectorRefs: ChangeDetectorRef, public RequestService: RequestService) { }

  ngOnInit() {

    this.userId = JSON.parse(localStorage.getItem('userId'));
    console.log(this.userId);

    let response:any = this.RequestService.fetchpendingReq(this.userId).subscribe((response:any)=>{

      this.dataSource = response.req_data;

    });

    console.log(this.dataSource); 

    
  }

  ngOnDestroy() {
  }

}
