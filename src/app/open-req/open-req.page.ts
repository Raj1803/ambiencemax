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

  constructor(public UserDataService: UserDataService, private RequestService: RequestService) { }

  ngOnInit() {

    let response:any = this.RequestService.fetchopenReq().subscribe((response:any)=>{

      this.dataSource = response.req_data;

    });

    console.log(this.dataSource);

  }

}
