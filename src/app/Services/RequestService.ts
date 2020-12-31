import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReqSchema } from './ReqSchema';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

export interface Role{
  role_id:number;
  role_name:String;
}

export interface RoleMap1{
  role:String;
}

@Injectable()
export class RequestService {
  usersURL="http://localhost:5600/api/users";
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json',

    })

  }
  constructor( private http: HttpClient, private router: Router) {}

  public allReqs: ReqSchema[] = [];
  public pendingReqs: ReqSchema[] = [];
  public viewReq: ReqSchema;
  ReqId=null;
  public role1:Role[] = [];
  public Workflow = [];

  public RoleMap = [
    'Building Head',
    'Location Head',
    'Cluster Head',
    'City Head',
    'State Head',
    'Country Head',
    'Geography Head'
  ];

  public RoleMap1:RoleMap1;

  getRequest(user_id: string) {
    return this.http.post('http://localhost:3000/dashboard', { user_id });
  }

  // getAllRequest(user_id: string) {
  //   return this.http.post('http://localhost:3000/allReq', { user_id });
  // }

  fetchaallReq(user_id: string){

    //  return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/all_reqs',{}).subscribe((response) => {
    //     if (response.req_data.length > 0 ) {
    //         console.log(response.req_data);
    //         console.log(response.result);

    //         this.allReqs = [...response.req_data];

    //         //return(response.req_data);

    //     }
    // })

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/all_reqs',{user_id});


  }

  fetchpendingReq(user_id: string){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/pending_reqs',{user_id});
    // .subscribe((response) => {
    //     if (response.req_data.length > 0 ) {
    //         console.log(response.req_data);
    //         console.log(response.result);

    //         this.pendingReqs = [...response.req_data];
    //     }
    // })

  }

  fetchclosedReq(user_id: string){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/closed_reqs',{user_id});

  }

  fetchopenReq(user_id: String){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/open_reqs',{user_id});

  }

  getLastApprove(reqId:number)
  {
    this.RoleMap[this.viewReq.req_level-1];
   // console.log("Last Approved",this.RoleMap[this.viewReq.req_level-1]);
    return this.RoleMap[this.viewReq.req_level-1];
  }

  getViewRequestData(reqId:number){
    return this.http.post('http://localhost:3000/viewRequestData', { reqId });
  }

  getWorkFlow(reqId: number) {
    this.http.post('http://localhost:3000/workflow', {req_id: reqId})
    .subscribe((ResData) => {
      console.log(ResData);
      this.Workflow = ResData[0].w_flow.split(',');
      console.log("Workflow",this.Workflow);
    //  this.decideApprove();
      });

    }

  getViewStatus(reqId:number){
      this.http.post<{ result: string,w_flow:[], role: Role[]}>('http://localhost:3000/viewStatus', {req_id: reqId})
      .subscribe((ResData) => {
        console.log(ResData);
        this.Workflow=ResData.w_flow;
        this.role1=ResData.role;
        this.role1.sort((a,b) => a.role_id-b.role_id);
        console.log("Workflow",this.Workflow);
        console.log("Role",this.role1);
      });
    }

    getRole(){
      this.http.get<{role_name:RoleMap1}>('http://localhost:3000/getRole')
      .subscribe((ResData) => {
        this.RoleMap1=ResData.role_name;
        console.log("RoleMap1",this.RoleMap1);
        });
    }


}