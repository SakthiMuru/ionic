import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {formatDate} from '@angular/common';
import { ApiService } from 'src/app/services/apiservice';
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
@Component({
  selector: 'app-add-reschedule',
  templateUrl: './add-reschedule.page.html',
  styleUrls: ['./add-reschedule.page.scss'],
})
export class AddReschedulePage implements OnInit {
  array_reporter_list_of_issues:any;
  t_date = new Date().toISOString();
  public photos:any = [];
  public photoss:any = [];
  photo_list:any;
  post_method:any = [];
  formGroup!: FormGroup;
  reporterId!:FormControl;
  issueName!:FormControl;
  targetDate!: FormControl;
  briefIf!: FormControl;
  visible:boolean = false;
  birthDate:any;
  id:any;
  isShown: boolean = true;
  ishide: boolean = true;
  countermeasure_brief_if!: FormControl;
  a_list:any;
  isview = false;
  ishideview = true;
  isupdate = false;
  public ImgUrl:any;
  filter_response :any[] = [];
  array_reporter_team :any;
  reporter_id:any;
  all_team_list:any;
  isDisabled:boolean = true;
  constructor(public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.t_date = new Date().toISOString();
    this.FormControls();

    this.route.params.subscribe(params => {   
      this.id = params['id'];
   });
   this.route.params.subscribe(params => {
    this.a_list = params['view'];
  });
   if (this.a_list !== "edit" && this.a_list !== "view") {
      this.ishide = ! this.isShown;
    }
   if (this.a_list == "view") {
     this.id_get();
     this.isview = true;
     this.ishideview = false;
     this.isShown = ! this.isShown;
   }else if (this.a_list == "edit") {
    this.isview = false;
     this.ishideview = true;
    this.id_get();
     this.isupdate = true;
     this.ishide = ! this.isShown;
     
   } 

  }

  ionViewWillEnter(){
    this.reporter_team_list();
  }
   
   //reporter get method 
   reporter_team_list(){
    this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
      this.filter_response = response;
      this.all_team_list = response;
    });
    }

  //id get method
  id_get(){
    this.apiService.getMethodwithToken(`/Reportees/${this.id}`).subscribe((response: any) => {
      console.log('res1234',response)
    const employee = response;
    this.reporterId.setValue(employee.reporterId);
    this.issueName.setValue(employee.issueName);
    this.t_date = employee.targetDate;
    console.log('sdsdsds',employee.targetDate)
    this.briefIf.setValue(employee.briefIf);
    // this.countermeasure_brief_if.setValue(employee.countermeasure_brief_if);
    console.log('this.filter_response',this.filter_response);
    var searchlist = this.filter_response.filter((x:any) => x.team == employee.reporterId);
    this.array_reporter_list_of_issues = searchlist;
    });
  }
  
  triggerEvent(data:any){
    this.isDisabled = false;
    this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
      var searchlist = response.filter((x:any) => x.reporterTeamId == data.target.value);
      this.array_reporter_list_of_issues = searchlist[0].issueList;
    });
  }
  FormControls() {
    this.reporterId = new FormControl('', [Validators.required]);
    this.issueName = new FormControl('', [Validators.required]);
    this.targetDate = new FormControl('', [Validators.required]);
    this.briefIf = new FormControl('', [Validators.required]);
    this.formGroup = new FormGroup({
      reporterId:this.reporterId,
      issueName:this.issueName,
      targetDate: this.targetDate,
      briefIf: this.briefIf
    });
  }
  submit() {
    console.log('this.formGroup.value',this.formGroup.value)
    if (this.formGroup.invalid) {
      // this.message = 'Invalid data';
      return;
    }
    console.log('111',typeof this.formGroup.value.targetDate)
    console.log('222',this.formGroup.value.targetDate)
    
    console.log('this.a_list1234567',this.a_list)
    let employee = {
      "reporter_id": this.reporter_id,
      ...this.formGroup.value
  };
  console.log('employee',employee)
    if (this.a_list == 'edit') {
      if (this.formGroup.value !== undefined) {
        console.log('edit',this.photo_list)
         this.edit(employee,this.id);
      } 
    }
    // else{
    //   if (this.formGroup.value !== undefined) {
    //     this.post(employee);
    //   } 
    // }
      }
      // post(list:any){
      //   console.log("list123",list)
      //     this.apiService.post('/Reportees/Reschedules',list).subscribe((response: any) => {
      //       console.log("3333444555",response)
      //       this.router.navigate(['/reschedule']);
      //       this.formGroup.reset();
      //       this.visible = false;
      //       this.t_date = new Date().toISOString();
      //     });
      // }
       //edit method
       edit(list:any,id:any){
        console.log("edit123",list)
        this.apiService.edit(`/Reportees/${id}`,list).subscribe((response: any) => {
          console.log("777777",response)
          this.router.navigate(['/reschedule']);
          this.formGroup.reset();
        });
      }

//  public async addPhotoToGallery() {
//     const capturedPhoto:Photo = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 100
//     });
//     this.photo_list = capturedPhoto;
//     var a_list = Object.assign({},capturedPhoto);
//     this.photoss = a_list.webPath;
//     this.visible = true;
//     this.photos = this.sanitizer.bypassSecurityTrustResourceUrl(this.photoss);
//     console.log('this.photos',typeof this.photos)
//     console.log('this.photos11', this.photos)
//   }
}
