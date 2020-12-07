import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReqSchema } from './ReqSchema';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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

  fetchaallReq(){

    //  return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/all_reqs',{}).subscribe((response) => {
    //     if (response.req_data.length > 0 ) {
    //         console.log(response.req_data);
    //         console.log(response.result);

    //         this.allReqs = [...response.req_data];

    //         //return(response.req_data);

    //     }
    // })

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/all_reqs',{});


  }

  fetchpendingReq(){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/pending_reqs',{});
    // .subscribe((response) => {
    //     if (response.req_data.length > 0 ) {
    //         console.log(response.req_data);
    //         console.log(response.result);

    //         this.pendingReqs = [...response.req_data];
    //     }
    // })

  }

  fetchclosedReq(){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/closed_reqs',{});

  }

  fetchopenReq(){

    return this.http.post<{ result: string, req_data: ReqSchema[]}>('http://localhost:3000/open_reqs',{});

  }




}