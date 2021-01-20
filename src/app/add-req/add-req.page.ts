import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../Services/UserDataService';
import { ReqSchema } from '../Services/ReqSchema';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CustomFormsModule, CustomValidators } from 'ng2-validation'
import {FileUploader,FileSelectDirective} from 'ng2-file-upload';
import { FormControl } from '@angular/forms';
const URL = 'http://localhost:5600/api';

@Component({
  selector: 'app-add-req',
  templateUrl: './add-req.page.html',
  styleUrls: ['./add-req.page.scss'],
})
export class AddReqPage implements OnInit {

  form: FormControl;

  public filepath=[];
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    hasAnotherDropZoneOver:boolean;
    response:string;

  title = 'fileUpload';
  images;
  multipleImages = [];

  attachmentList:any = [];



  constructor(
    private http: HttpClient,
    public UserDataService: UserDataService, 
    private router: Router,
    public toastController: ToastController) {

      this.form = new FormControl({
        inputbudget:new FormControl('',CustomValidators.min(1))
      });

      this.uploader = new FileUploader({
        url: URL,
        disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
        formatDataFunctionIsAsync: true,
        formatDataFunction: async (item) => {
          return new Promise( (resolve, reject) => {
            resolve({
              name: item._file.name,
              length: item._file.size,
              contentType: item._file.type,
              date: new Date()
            });
          });
        }
      });
    
      this.hasBaseDropZoneOver = false;
      this.hasAnotherDropZoneOver = false;
    
      this.response = '';
    
      this.uploader.response.subscribe( res => this.response = res );


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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  selectImage(event) {
    if (event.target.files.length > 0) {

      if(event.target.files.size/1024/1024 > 10){
        console.log("File is bigger then 10 mb");
      }
      else{
        const file = event.target.files[0];
        this.images = file;
      }
      
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {

      if(event.target.files.size/1024/1024 > 10){
        console.log("File is bigger then 10 mb");
      }
      else{
        this.multipleImages = event.target.files;
      }

    }
  }

  onMultipleSubmit(){
    const formData = new FormData();



    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:5600/multipleFiles', formData).subscribe((res) =>{
      
      for (let i = 0; i < res.files.length; i++) { 
        this.filepath[i]=res.files[i]['path'];
    console.log(this.filepath);
      }
  });
  }

  async onSubmit() {
    // this.openSnackBar('Request Submitted Successfully !');
    this.currReq.req_initiator_id = this.UserDataService.userId;
    this.UserDataService.addRequest(this.currReq,this.filepath);
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
