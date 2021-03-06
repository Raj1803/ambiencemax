import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReqSchema } from './ReqSchema';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ClassField } from '@angular/compiler';
export interface  UserData {
  userId: string;
  email: string;
  password: string;
  userRole: number;
  Requests: ReqSchema[];
  reqStats: ReqStats;
  pendingReq: ReqSchema[];
  closedReq: ReqSchema[];
  openReq: ReqSchema[];
  hId: number;
  reqOffset: number;
  viewReq: ReqSchema;
}
export interface ReqStats {
  All: number;
  Pending: number;
  Closed: number;
  Open: number;
}
@Injectable()
export class UserDataService {
  usersURL="http://localhost:5600/api/users";
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json',

    })

  }
  constructor( private http: HttpClient, private router: Router) {}
  Data: UserData;
  userId = null;
  userRole = null;
  ReqId=null;
  w_id=null;
  userRole1=0;
  isPending = false;
  public fetchedReqs: ReqSchema[];
  public fetchedReqsUpdated = new Subject<ReqSchema[]>();
  public reqStatsSubject = new Subject<ReqStats>();
  public desiredReqSub = new Subject<ReqSchema[]>();
  public mainSub = new Subject<string>();
  public toBeApproved = false;
  public message = '';
  public email = '';
  public password = '';
  public reqStats: ReqStats;
  public hId: number;
  public reqOffset: number;
  public reqStart: number;
  public main = '';
  public viewReq: ReqSchema;
  public allRequests: ReqSchema[] = [];
  public pendingRequests: ReqSchema[] = [];
  public closedRequests: ReqSchema[] = [];
  public openRequests: ReqSchema[] = [];
  public underNegRequests: ReqSchema[] = [];
  public desiredRequests: ReqSchema[] = [];
  public Workflow = [];

  action_taken_by="";

  public reqTypeData: {
    'Pending': number,
    'Closed': number,
    'Open': number
  };
  public RoleMap = [
    'Building Head',
    'Location Head',
    'Cluster Head',
    'City Head',
    'State Head',
    'Country Head',
    'Geography Head'
  ];
  mainObservable(){
    return this.mainSub.asObservable();
  }
  fetchDesiredObservable() {
    return this.desiredReqSub.asObservable();
  }
  fetchObservable() {
    return this.fetchedReqsUpdated.asObservable();
  }
  fetchReqStat() {
    return this.reqStatsSubject.asObservable();
  }
  
  // authenticateUser(email: string, password: string) {
  //   this.email = email;
  //   this.password  = password;
  //   // tslint:disable-next-line: max-line-length
  //   this.http.post<{ result: string, user_id: string, req_data: ReqSchema[] , role_id: number , req_stats: ReqStats , h_id: number}>
  //     ('http://localhost:3000/login', { email, password })
  //     .subscribe((ResData) => {
  //       console.log(ResData);
  //       this.userId = ResData.user_id;
  //       this.userRole = ResData.role_id;
  //       this.fetchedReqs = [...ResData.req_data];
  //       this.allRequests = this.fetchedReqs;
  //       this.fetchedReqsUpdated.next(this.fetchedReqs);
  //       this.reqStats = ResData.req_stats;
  //       this.reqOffset = this.allRequests[this.allRequests.length - 1 ].req_id;
  //       // this.reqStatsSubject.next(this.reqStats);
  //       this.hId = ResData.h_id;
  //       console.log(this.hId);
  //       console.log(this.reqStats);
  //       console.log('================================================');
  //       console.log('Request Data Fetched On Auth !');
  //       console.log(this.reqStats);
  //       this.ReqClassification(this.fetchedReqs);
  //       console.log('Pending Requests :');
  //       console.log(this.pendingRequests);
  //       console.log('Closed Requests :');
  //       console.log(this.closedRequests);
  //       console.log('Open Requests :');
  //       console.log(this.openRequests);
  //       console.log('================================================');
  //       this.Data = {
  //         userId: this.userId,
  //         userRole: this.userRole,
  //         email: this.email,
  //         password: this.password,
  //         Requests: this.allRequests,
  //         reqStats: this.reqStats,
  //         pendingReq: this.pendingRequests,
  //         closedReq: this.closedRequests,
  //         openReq: this.openRequests,
  //         hId: this.hId,
  //         reqOffset: this.reqOffset,
  //         viewReq: this.viewReq
  //       };
  //       this.router.navigate(['dashboard']);
  //       if (this.userRole !== null) {
  //         localStorage.setItem('userData', JSON.stringify(this.Data));
  //         console.log(this.Data);
  //       }
  //     });
  // }

  authenticateUser1(email: string, password: string) {
    this.email = email;
    this.password  = password;
    this.http.post<{ result: string,w_id:number, user_id: string,role_id: number,h_id: number }>
      ('http://localhost:3000/login', { email, password })
      .subscribe((ResData) => {
        
        console.log(ResData);
        this.userId = ResData.user_id;
        this.userRole=ResData.role_id;
        this.w_id=ResData.w_id;

        if(ResData.result === "passed" )
        {
          this.router.navigateByUrl('/dashboard');
        }

        
        if (this.userRole !== null) {
          console.log(this.userId);
          localStorage.setItem('userRole', JSON.stringify(this.userRole));
          localStorage.setItem('userId', JSON.stringify(this.userId));
          localStorage.setItem('w_id', JSON.stringify(this.userId));
        }
      });
  }
  
  getWorkFlow(reqId: number) {
    this.http.post('http://localhost:3000/workflow', {req_id: reqId})
    .subscribe((ResData) => {
      console.log(ResData);
      this.Workflow = ResData[0].w_flow.split(',');
      console.log("Workflow",this.Workflow);
      this.decideApprove();
      });
  }
  getLastApprove(reqId:number)
  {
    this.RoleMap[this.viewReq.req_level-1];
    console.log("Last Approved",this.RoleMap[this.viewReq.req_level-1]);
    return this.RoleMap[this.viewReq.req_level-1];
  }
  getFlow(reqId:number){
    if(this.viewReq.w_id==1){
      for(let i=1;i<this.RoleMap.length;i++)
      {console.log("flow",this.RoleMap[i]);
        this.Workflow.push(this.RoleMap[i])  
    }
    
    }
    if(this.viewReq.w_id==2){
      for(let i=2;i<this.RoleMap.length;i++)
      {console.log("flow",this.RoleMap[i]);
        this.Workflow.push(this.RoleMap[i])  
    }
  }
  if(this.viewReq.w_id==3){
    for(let i=3;i<this.RoleMap.length;i++)
    {console.log("flow",this.RoleMap[i]);
      this.Workflow.push(this.RoleMap[i])  
  }}
  if(this.viewReq.w_id==4){
    for(let i=4;i<this.RoleMap.length;i++)
    {console.log("flow",this.RoleMap[i]);
      this.Workflow.push(this.RoleMap[i])  
  }}
  return this.Workflow;
  }

  decideApprove() {

    console.log("User Role:",this.userRole.toString());
      console.log("w1",this.Workflow.indexOf( this.userRole.toString()));
      console.log("w2",this.viewReq.req_level);
      console.log("user_r",this.userRole>=1);
      this.userRole1=this.Workflow.indexOf( this.userRole.toString());
      this.userRole1=this.Workflow[this.userRole1+1];
      console.log("next user Role",this.userRole1);
      if (this.Workflow.indexOf( this.userRole.toString())==0 || (this.Workflow.indexOf( this.userRole.toString()))) {
        this.toBeApproved = true;
        console.log(this.toBeApproved);
        localStorage.setItem('toBeApproved', JSON.stringify(this.toBeApproved));
        console.log(JSON.parse(localStorage.getItem('toBeApproved')));
        this.message = '';
        this.viewReq.req_level = this.userRole;
      }
      if ( this.viewReq.req_level + 1 === this.userRole || this.userRole === 1 ) {
        this.message = '';
      } else if (this.viewReq.req_level >= this.userRole) {
        this.message = 'You have already acted on this request';
      } else if (this.viewReq.req_level < this.userRole) {
        this.message = 'This request is still in the Open queue of previous aprrovers ';
      }
      localStorage.setItem('toBeApproved', JSON.stringify(this.toBeApproved));
      localStorage.setItem('message', JSON.stringify(this.message));

    // console.log(this.userRole.toString());
    // if ((this.Workflow.indexOf( this.userRole.toString() ) === 0 && this.viewReq.req_level === 1 )
    // || this.Workflow[this.Workflow.indexOf( this.userRole.toString() ) - 1] - this.userRole === this.viewReq.req_level - this.userRole) {
    //   this.toBeApproved = true;
    //   console.log(this.toBeApproved);
    //   localStorage.setItem('toBeApproved', JSON.stringify(this.toBeApproved));
    //   console.log(JSON.parse(localStorage.getItem('toBeApproved')));
    //   this.message = '';
    //   this.viewReq.req_level = this.userRole;
    // }
    // if ( this.viewReq.req_level + 1 === this.userRole || this.userRole === 1 ) {
    //   this.message = '';
    // } else if (this.viewReq.req_level >= this.userRole) {
    //   this.message = 'You have already acted on this request';
    // } else if (this.viewReq.req_level < this.userRole) {
    //   this.message = 'This request is still in the Open queue of previous aprrovers ';
    // }
    // localStorage.setItem('toBeApproved', JSON.stringify(this.toBeApproved));
    // localStorage.setItem('message', JSON.stringify(this.message));

  }

  Approved(reqId: number) {

    console.log("req id.....",reqId);
      console.log("Next User Role.....:",this.userRole1);
      this.http.post('http://localhost:3000/approve', {req_id: reqId , userRole: this.userRole1})
      .subscribe((ResData) => {
        console.log("In Approved Method",ResData);
      });

      if ( this.Workflow.indexOf(this.userRole.toString()) === this.Workflow.length - 1 ) {
        this.http.post('http://localhost:3000/closeReq', {req_id: reqId })
      .subscribe((ResData) => {
        console.log(ResData);
      });
      }
      this.toBeApproved = false;
      console.log("in approvelog",reqId,"and userRole is",this.userRole);
     this.action_taken_by=this.RoleMap[this.userRole-1];
      console.log("this.action_taken_by",this.action_taken_by);
      console.log("user ....Role",this.userRole,this.ReqId);
      this.http.post('http://localhost:5600/addLog', {req_id: reqId , userRole: this.userRole,action_taken_by:this.action_taken_by})
      .subscribe((ResData) => {
        console.log("In add log",ResData);
      });

    // this.http.post('http://localhost:3000/approve', {req_id: reqId , userRole: this.userRole})
    // .subscribe((ResData) => {
    //   console.log(ResData);
    // });
    // if ( this.Workflow.indexOf(this.userRole.toString()) === this.Workflow.length - 1 ) {
    //   this.http.post('http://localhost:3000/closeReq', {req_id: reqId })
    // .subscribe((ResData) => {
    //   console.log(ResData);
    // });
    // }

    // this.openRequests.forEach((e , index) => {
    //   if (e.req_id === this.viewReq.req_id) {
    //     if ( this.Workflow.indexOf(this.userRole.toString()) === this.Workflow.length - 1 ) {
    //       e.req_level = this.userRole;
    //       this.closedRequests.push(e);
    //       this.reqStats.Closed += 1;
    //     }
    //     this.reqStats.Open -= 1;
    //     this.Data.reqStats.Open = this.reqStats.Open;
    //     localStorage.setItem('userData', JSON.stringify(this.Data));
    //     this.openRequests.splice(index, 1);
    //     console.log(this.pendingRequests);
    //   }
    // });
    // this.allRequests.forEach((e) => {
    //   if (e.req_id === this.viewReq.req_id) {
    //     e.req_level = this.userRole;
    //   }
    // });
    // this.pendingRequests.forEach((e) => {
    //   if (e.req_id === this.viewReq.req_id) {
    //     e.req_level = this.userRole;
    //   }
    // });
    // console.log(this.allRequests);
    // console.log('User Data Service Main : ' + this.main);
    // if (this.main === 'Pending') {
    //   this.desiredRequests = this.pendingRequests;
    //   console.log('Pending Called');
    // // this.isPending = true;
    // } else if (this.main === 'all') {
    // // this.isPending = false;
    //   this.desiredRequests = this.allRequests;
    //   console.log('All Called');
    // } else if (this.main === 'closed') {
    // // this.isPending = false;
    //   this.desiredRequests = this.closedRequests;
    //   console.log('Closed Called');
    // } else if (this.main === 'open') {
    //   // this.isPending = false;
    //   this.desiredRequests = this.openRequests;
    //   console.log('Closed Called');
    // }
    // this.desiredReqSub.next(this.desiredRequests);
    // this.toBeApproved = false;


  }

  addRequest(newReq: ReqSchema,filepath) {
    this.http.post('http://localhost:3000/newReq', {request: newReq}).subscribe((data:ReqSchema) => {
      console.log('Request Submitted!');
      this.addToLog(JSON.parse(JSON.stringify(data)).id,filepath);
    });
  }

  addToLog(newReqId, filepath) {
    for (let i = 0; i < filepath.length; i++) {
      filepath[i] = filepath[i];
      this.http.post('http://localhost:3000/fileUpload', { req_id: newReqId, filepath: filepath[i] })
        .subscribe((ResData) => {
          console.log("file upload data");
          console.log(ResData);
        });
    }
    this.http.post('http://localhost:5600/addLogNewReq', { req_id: newReqId, userRole: this.userRole })
      .subscribe((ResData) => {
        console.log("new request data");
        console.log(ResData);
      });
  }
  
  // ReqClassification(Requests: ReqSchema[]) {
    // this.reqStats.Open = 0;
  //   console.log('ReqClassification');
  //   console.log('------------------------------------------');
  //   Requests.forEach(( el ) => {
  //     if (el.req_status === 'Pending' && !this.pendingRequests.includes(el)) {
  //       console.log('Pending Classification Done! for Request Id ' + el.req_id);
  //       this.pendingRequests.push(el);
  //       if (el.req_level + 1 === this.userRole) {
  //         this.openRequests.push(el);
  //         console.log('Open Classification Done! for Request Id ' + el.req_id);        }
  //     }
  //     if (el.req_status === 'closed' && !this.closedRequests.includes(el)) {
  //       // this.Closed++;
  //       this.closedRequests.push(el);
  //       console.log('Closed Classification Done! for ' + el.req_id);
  //     }
  //   });
  //   console.log('---------------------------------------------');
  // }
   ReqClassification(Requests: ReqSchema[]) {
     //console.log("inside reqclassification",this.Workflow);
     console.log("inside reqclassification",this.userRole);
     //console.log("inside reqclassification",this.viewReq.req_level);
    Requests.forEach(( el ) => {
     
      if (el.req_status === 'Pending'  && !this.pendingRequests.includes(el)) {
            console.log('Pending Classification Done! for Request Id ' + el.req_id);
            this.pendingRequests.push(el);
            this.http.post('http://localhost:3000/workflow', {req_id: el.req_id})
            .subscribe((ResData) => {
              console.log(ResData);
              this.Workflow = ResData[0].w_flow.split(',');
            
            //console.log("Workflow in reqclassification",this.Workflow,"request level",el.req_level,"userRole",this.userRole);
            for(let i=0;i<this.Workflow.length;i++){    
              if (this.Workflow[i]==this.userRole) {
                console.log("Workflow in reqclassification",this.Workflow[i],"i-1",this.Workflow[i-1],"request level",el.req_level,"userRole",this.userRole);
                if(el.req_level == this.userRole-1)
                {
                this.openRequests.push(el);
                console.log('Open Classification Done! for Request Id ' + el.req_id);}
                 } 
                
        }
        // if(this.userRole==2)
        // {
        //   if(el.req_level==1)
        //   {
        //    this.openRequests.push(el);
        //    console.log('Open Classification Done! for Request Id ' + el.req_id);
        //   }
        // }
      }
      );}
          if (el.req_status === 'closed' && !this.closedRequests.includes(el)) {
            // this.Closed++;
            this.closedRequests.push(el);
            console.log('Closed Classification Done! for ' + el.req_id);
          }
        }); 
   }

  compare(a: ReqSchema, b: ReqSchema ) {
    if ( a.req_id < b.req_id ) {
      return 1;
    }
    if ( a.req_id > b.req_id ) {
      return -1;
    }
    return 0;
  }
  fetchMoreRequests() {
    this.reqStart = this.allRequests[0].req_id;
    console.log(this.Data);
    // tslint:disable-next-line: max-line-length
    this.http.post<{result: number; user_id: number, req_data: ReqSchema[], role_id: number}>('http://localhost:3000/moreReq', {userRole: this.userRole , hId: this.hId , reqOffset: this.reqOffset , reqStart: this.reqStart , user_id: this.userId }).subscribe((response) => {
      if (response.req_data.length > 0 ) {
        console.log('New Requests Fetched!');
        console.log('-----------------------------');
        this.allRequests.push(...response.req_data);
        this.allRequests.sort(this.compare);
        this.ReqClassification(response.req_data);
        this.reqOffset = this.allRequests[this.allRequests.length - 1].req_id;
        console.log('User Data Service Main : ' + this.main);
        if (this.main === 'Pending') {
          this.desiredRequests = this.pendingRequests;
          console.log('Pending Called');
        // this.isPending = true;
        } else if (this.main === 'all') {
        // this.isPending = false;
          this.desiredRequests = this.allRequests;
          console.log('All Called');
        } else if (this.main === 'closed') {
        // this.isPending = false;
          this.desiredRequests = this.closedRequests;
          console.log('Closed Called');
        } else if (this.main === 'open') {
          // this.isPending = false;
          this.desiredRequests = this.openRequests;
          console.log('Closed Called');
        }
        this.desiredReqSub.next(this.desiredRequests);
        console.log(this.desiredRequests);
        this.Data = {
          userId: this.userId,
          userRole: this.userRole,
          email: this.email,
          password: this.password,
          Requests: this.allRequests,
          reqStats: this.reqStats,
          pendingReq: this.pendingRequests,
          closedReq: this.closedRequests,
          openReq: this.openRequests,
          hId: this.hId,
          reqOffset: this.reqOffset,
          viewReq: this.viewReq
        };
        if (this.userRole !== null) {
          localStorage.setItem('userData', JSON.stringify(this.Data));
          console.log(this.Data);
        }
      }
      console.log('-----------------------------');
      // console.log(this.Data);
    });
  }
  getusers(req_id){
    return this.http.get(this.usersURL + `/${req_id}`);
  }
  // addAction(reqId: number) {
  //   this.http.post('http://localhost:3000/getflow', {req_id: reqId})
  //   .subscribe((ResData) => {
  //     console.log(ResData);
  //   });

  // }
  Addaction(reqId: Number) {
    this.http.post('http://localhost:3000/getRole', {req_id: reqId }).subscribe((ResData)=>{
    // .subscribe((ResData) => {
      console.log(ResData);
      // return this.http.get(reqId);
     
    });
  }
  addAction(reqId: number) {
    this.http.post('http://localhost:3000/getflow', {req_id: reqId})
    .subscribe((ResData) => {
      console.log(ResData);
    });

  }

  fetchLatestRequests() {
    this.reqStart = this.allRequests[0].req_id;
    // tslint:disable-next-line: max-line-length
    this.http.post<{result: number; user_id: number, req_data: ReqSchema[], role_id: number}>('http://localhost:3000/getLatestReqs', {userRole: this.userRole , hId: this.hId , reqStart: this.reqStart , user_id: this.userId }).subscribe((response) => {
      if ( response.req_data.length > 0 ) {
        console.log('Latest Requests Fetched!');
        console.log('-----------------------------');
        this.allRequests.push(...response.req_data);
        this.allRequests.sort(this.compare);
        this.ReqClassification(response.req_data);
        this.reqOffset = this.allRequests[this.allRequests.length - 1].req_id;
        console.log('User Data Service Main : ' + this.main);
        if (this.main === 'Pending') {
          this.desiredRequests = this.pendingRequests;
          console.log('Pending Called');
        // this.isPending = true;
        } else if (this.main === 'all') {
        // this.isPending = false;
          this.desiredRequests = this.allRequests;
          console.log('All Called');
        } else if (this.main === 'closed') {
        // this.isPending = false;
          this.desiredRequests = this.closedRequests;
          console.log('Closed Called');
        } else if (this.main === 'open') {
          // this.isPending = false;
          this.desiredRequests = this.openRequests;
          console.log('Closed Called');
        }
        this.reqStats.All += response.req_data.length;
        response.req_data.forEach((e) => {
          if (e.req_status === 'Pending') {
            this.reqStats.Pending ++;
            if (e.req_level + 1 === this.userRole) {
              this.reqStats.Open++;
            }
          } else if (e.req_status === 'Closed') {
            this.reqStats.Closed++;
          }
        });
        
        // this.reqStats.Open = this.openRequests.length;
        // this.reqStats.Closed = this.closedRequests.length;
        // this.reqStats.Pending = this.pendingRequests.length;
        this.reqStatsSubject.next(this.reqStats);
        console.log(this.reqStats);
        this.desiredReqSub.next(this.desiredRequests);
        console.log(this.desiredRequests);
        this.Data = {
          userId: this.userId,
          userRole: this.userRole,
          email: this.email,
          password: this.password,
          Requests: this.allRequests,
          reqStats: this.reqStats,
          pendingReq: this.pendingRequests,
          closedReq: this.closedRequests,
          openReq: this.openRequests,
          hId: this.hId,
          reqOffset: this.reqOffset,
          viewReq: this.viewReq
        };
        if (this.userRole !== null) {
          localStorage.setItem('userData', JSON.stringify(this.Data));
          console.log(this.Data);
        }
        console.log('-----------------------------');
      }
    });
  }
}
