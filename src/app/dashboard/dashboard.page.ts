import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { DashboardPopoverComponent } from '../dashboard-popover/dashboard-popover.component';
import { UserDataService } from '../Services/UserDataService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { RequestService } from '../Services/RequestService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  main = this.UsrDataService.main;

  private reqSub: Subscription;
  public Open = this.UsrDataService.openRequests.length;
  public UnderNeg = this.UsrDataService.underNegRequests.length;
  public All;
  public Pending;
  public Closed;
  public userId;
  public userRole;
  public w_id;
  ChartType = 'bar';

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  barChartLabels: Label[] = [ 'Pending' , 'Open', 'Closed'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];



  doughnutChartLabels: Label[] = [ 'Pending', 'Open' , 'Closed'];
  doughnutChartData: MultiDataSet = [];

  doughnutChartType: ChartType = 'doughnut';



  constructor(
    private menu: MenuController, 
    public popoverController: PopoverController, 
    public UsrDataService: UserDataService,
    public requestService: RequestService,
    private router: Router) {

   }


  ngOnInit() {
    console.log('ngOnint Dashboard!');
    this.UsrDataService.mainObservable().subscribe( e => {
      this.main = e;
    });

    this.userId = JSON.parse(localStorage.getItem('userId'));
      console.log('user_id',this.userId);
      this.userRole= JSON.parse(localStorage.getItem('userRole'));
      console.log('role_id',this.userRole);
      this.w_id= JSON.parse(localStorage.getItem('w_id'));
      console.log('w_id:',this.w_id);


      if (this.userRole != null) {
        
        let response:any=  this.requestService.getRequest(this.userId).subscribe((response:any)=>{
        this.Pending = response.req_stats.Pending;
        this.All = response.req_stats.All;
        this.Open = response.req_stats.Open;
        this.Closed = response.req_stats.Closed;

        this.barChartData = [
          {
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
            borderWidth: 1,
            barPercentage: 0.5,
            barThickness: 70,
            maxBarThickness: 80,
            minBarLength: 5,
            data: [this.Pending, this.Open, this.Closed],
            label: 'No Of Requests'
          }
        ];

        this.doughnutChartData = [
          
          this.Pending, this.Open, this.Closed
        ]


       
      });

    }
  
    

    // if(this.UsrDataService.userId==1){
      
    // }
    // if (this.UsrDataService.userRole == null || this.UsrDataService.allRequests.length === 0) {
    //   this.UsrDataService.Data = JSON.parse(localStorage.getItem('userData'));
    //   if (this.UsrDataService.Data !== null) {
    //     console.log('User Data Fetched from Local storage!');
    //     this.UsrDataService.pendingRequests = this.UsrDataService.Data.pendingReq;
    //     this.UsrDataService.closedRequests = this.UsrDataService.Data.closedReq;
    //     this.UsrDataService.openRequests = this.UsrDataService.Data.openReq;
    //     this.UsrDataService.email = this.UsrDataService.Data.email;
    //     this.UsrDataService.password = this.UsrDataService.Data.password;
    //     this.UsrDataService.allRequests = this.UsrDataService.Data.Requests;
    //     this.UsrDataService.userRole = this.UsrDataService.Data.userRole;
    //     this.UsrDataService.userId = this.UsrDataService.Data.userId;
    //     this.UsrDataService.reqStats = this.UsrDataService.Data.reqStats;
    //     this.All = this.UsrDataService.reqStats.All;
    //     this.Pending = this.UsrDataService.reqStats.Pending;
    //     this.Closed = this.UsrDataService.reqStats.Closed;
    //     this.UsrDataService.reqOffset = this.UsrDataService.Data.reqOffset;
    //     this.UsrDataService.hId = this.UsrDataService.Data.hId;
    //   } else {
    //     console.log('No User in session!');
    //     this.router.navigateByUrl('/');
    //   }
     // }



    // this.Pending = this.UsrDataService.reqStats.Pending;
    // this.All = this.UsrDataService.reqStats.All;
    // this.Open = this.UsrDataService.reqStats.Open;
    // this.Closed = this.UsrDataService.reqStats.Closed;
    // console.log('Sub called!');
    // this.UsrDataService.fetchReqStat().subscribe((e) => {
    //   this.Pending = e.Pending;
    //   this.All = e.All;
    //   this.Open = e.Open;
    //   this.Closed = e.Closed;
    //   console.log('Sub called!');
    // });

    

    // this.barChartData[0]["data"] = [this.Pending, this.Open, this.Closed];

    

  }

  topending(){
    this.router.navigate(['/pending-req']);
  }

  toopen(){
    this.router.navigate(['/open-req']);
  }

  toclose(){
    this.router.navigate(['/closed-req']);
  }

  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(54, 162, 235, 0.5)']
    }
]



  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }

  async presentPopup(event){
    const popover = await this.popoverController.create({
      component: DashboardPopoverComponent,
      event
    });
    return await popover.present();
  }

}
