import { Component, OnInit } from '@angular/core';
import { ReqSchema } from '../Services/ReqSchema';
import { RequestService } from '../Services/RequestService';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.page.html',
  styleUrls: ['./view-request.page.scss'],
})
export class ViewRequestPage implements OnInit {

  view: ReqSchema;
  public req_id;
  public req_title;
  public req_type;
  public req_budget;
  public req_date;
  public req_description;
  public req_initiator_id;
  public req_status;
  public last_approve;

  constructor(public RequestService: RequestService) { 
    // this.view = RequestService.viewReq;
  }

  ngOnInit() {

    this.RequestService.getViewRequestData(this.RequestService.ReqId).subscribe((response:any) => {
      this.req_id = response.req_data[0]['req_id'];
      this.req_title=response.req_data[0]['req_title'];
      this.req_type=response.req_data[0]['req_type'];
      this.req_initiator_id=response.req_data[0]['req_initiator_id'];
      this.req_date=response.req_data[0]['req_date'];
      this.req_budget=response.req_data[0]['req_budget'];
      this.req_description=response.req_data[0]['req_description'];
      this.req_status=response.req_data[0]['req_status'];
      this.last_approve=response.role_name[0]['role_name'];
    });
    
    console.log(this.view);
  }

}
