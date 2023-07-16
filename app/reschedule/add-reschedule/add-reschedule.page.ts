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
  a_reporter_name:any= '';
  t_date = new Date().toISOString();
  isDisabled:boolean = true;
  array_reporter_team :any;
  array_reporter_list_of_issues:any;
  public photos:any = ''
  public photoss:any = [];
  photo_list:any;
  post_method:any = [];
  myGroup!: FormGroup;
  reporterTeamId!:FormControl;
  issueName!:FormControl;
  name!: FormControl;
  reporteeTeamId!: FormControl;
  briefIf!: FormControl;
  visible:boolean = false;
  id:any;
  isShown: boolean = true;
  ishide: boolean = true;
  reportee_ishide: boolean = true
  reportee_isShown: boolean = true;
  reportee_ishow: boolean = true;
  a_list:any;
  isupdate = false;
  isview = false;
  ishideview = true;
  filter_response :any;
  choice = 'Family';
  public arr = new Array(25);
  private reporter_id:any;
  all_team_list:any;
  product_all_team_list:any;
  reporterId:any;
  issueTargetDate:any;
  constructor(public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.t_date = new Date().toISOString();
    this.reporter_team_list();
    this.report_team_list();
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
    this.id_get();
    this.visible = true;
    this.isDisabled = false;
     this.isupdate = true;
     this.ishide = ! this.isShown;
     
   }
    this.FormControls();
  }

  //reporter get method 
  reporter_team_list(){
    this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
      this.filter_response = response;
      this.all_team_list = response;
    });
    }
 
     //team get method 
     report_team_list(){
      this.apiService.getMethodwithToken(`/Masters/ReporteeTeams`).subscribe((response: any) => {
        this.product_all_team_list = response;
      });
      }

  ionViewWillEnter(){}
  
  //id get method
  id_get(){
    this.apiService.getMethodwithToken(`/Reportees/${this.id}`).subscribe((response: any) => {
    const employee = response;
    this.reporterTeamId.setValue(employee.reporterTeamId.toString());
    this.issueName.setValue(employee.issueName);
    this.name.setValue(employee.name);
    this.t_date = employee.issueTargetDate;
    this.reporteeTeamId.setValue(employee.reporteeTeamId.toString());
    this.briefIf.setValue(employee.briefIf);
    this.photos = employee.resolveImage;
    // this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
    //   var searchlist = response.filter((x:any) => x.reporterTeamId == employee.reporterTeamId);
    //   this.array_reporter_list_of_issues = searchlist[0].issueList;
    // });
    });
  }
  triggerEvent(data:any){
    console.log('data',data.target.value)
    this.isDisabled = false;
    this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
      console.log('response',response)
      var searchlist = response.filter((x:any) => x.reporterTeamId == data.target.value);
      console.log('searchlist',searchlist)
      this.array_reporter_list_of_issues = searchlist[0].reporters;
      console.log('this.array_reporter_list_of_issues',this.array_reporter_list_of_issues)
    });
  }

  briefifEvent(data:any){
  this.reporterId = data.target.value.id;
  this.issueTargetDate = data.target.value.targetDate;
  }
  
  FormControls() {
    this.reporterTeamId = new FormControl('', [Validators.required]);
    this.issueName = new FormControl('', [Validators.required]);
    this.issueTargetDate = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.reporteeTeamId = new FormControl('', [Validators.required]);
    this.briefIf = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      reporterTeamId:this.reporterTeamId,
      issueName:this.issueName,
      issueTargetDate:this.issueTargetDate,
      name: this.name,
      reporteeTeamId: this.reporteeTeamId,
      briefIf: this.briefIf

    });
  }

  submit() {
        if (this.myGroup.invalid) {
          // this.message = 'Invalid data';
          return;
        }
    if (this.photos == '') {
      this.photos = {
        "resolveImage": '',
      };
    }
        if (this.myGroup.value !== undefined) {
          let employee = {
            "reporterId":this.reporterId,
            "issueTargetDate":this.issueTargetDate,
            "resolveImage": this.photo_list,
            ...this.myGroup.value
        };
          var all_data = Object(employee);
          var a_data = Object.create(all_data.issueName);
          all_data.issueName = a_data.briefIf;
        if (this.a_list == 'edit') {
          if (this.myGroup.value !== undefined) {
            this.edit(employee,this.id);
          } 
        }else{
          if (this.myGroup.value !== undefined) {
            this.post(employee);
          } 
        }
        } 
      }
      //post method
      post(list:any){
          this.apiService.post('/Reportees',list).subscribe((response: any) => {
            this.router.navigate(['/reportee']);
            // this.myGroup.reset();
            this.visible = false;
            this.photos = [];
          });
      }
      //edit method
      edit(list:any,id:any){
        this.apiService.edit(`/Reportees/${id}`,list).subscribe((response: any) => {
          this.router.navigate(['/reportee']);
          this.photos = [];
          this.myGroup.reset();
        });
      }
 public async addPhotoToGallery() {
    const capturedPhoto:Photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });
    var imageUrl = capturedPhoto.base64String;
    this.photo_list = "data:image/jpeg;base64," + imageUrl;
    this.photos = this.sanitizer.bypassSecurityTrustResourceUrl(this.photo_list);
    this.visible = true;
  }
}
