import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';
import { RequestService } from '../Services/RequestService';

@Component({
  selector: 'app-open-req',
  templateUrl: './open-req.page.html',
  styleUrls: ['./open-req.page.scss'],
})
export class OpenReqPage implements OnInit {

  public dataSource;
  public userId;
  public filterTerm: string;

  constructor(public UserDataService: UserDataService, public RequestService: RequestService) { }

  ngOnInit() {

    this.userId = JSON.parse(localStorage.getItem('userId'));
      console.log(this.userId);

    let response:any = this.RequestService.fetchopenReq(this.userId).subscribe((response:any)=>{

      this.dataSource = response.req_data;

    });

    console.log(this.dataSource);

  }

}
