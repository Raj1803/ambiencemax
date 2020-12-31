import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';
import { ReqSchema } from '../Services/ReqSchema';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CustomFormsModule, CustomValidators } from 'ng2-validation'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-req',
  templateUrl: './add-req.page.html',
  styleUrls: ['./add-req.page.scss'],
})
export class AddReqPage implements OnInit {

  form: FormControl;

  constructor(
    public UserDataService: UserDataService, 
    private router: Router,
    public toastController: ToastController) {

      this.form = new FormControl({
        inputbudget:new FormControl('',CustomValidators.min(1))
      });

     }

  Approvers = [];
  num = 1;

  currReq: ReqSchema = {
    req_date: '' ,
    req_description: '',
    req_id: 0,
    req_initiator_id: this.UserDataService.userId,
    req_level: 1,
    req_status: 'Pending',
    req_title: '',
    req_type: '',
    w_id: 0,
    req_budget: 0
  };

  async onSubmit() {
    // this.openSnackBar('Request Submitted Successfully !');
    this.UserDataService.addRequest(this.currReq);
    this.currReq.req_initiator_id = this.UserDataService.userId;
    this.UserDataService.main = '';
    this.UserDataService.mainSub.next(this.UserDataService.main);
    this.router.navigate(['dashboard']);
    
      const toast = await this.toastController.create({
        message: 'Your request have been submitted.',
        duration: 2000
      });
      toast.present();
    
  }

  ngOnInit() {
  }

  todashboard(){
    this.router.navigate(['/dashboard']);
  }


}
