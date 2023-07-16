import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment'
import {formatDate} from '@angular/common';
import { ApiService } from 'src/app/services/apiservice';
@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.page.html',
  styleUrls: ['./add-reportee.page.scss'],
})
export class AddReporteePage implements OnInit {
  // date = '';
  a_reporter_name:any= '';
  date = new Date().toISOString();
  isDisabled:boolean = true;
  array_reporter_team :any;
  array_reporter_list_of_issues:any;
  public photos:any = ''
  public photoss:any = [];
  photo_list:any;
  post_method:any = [];
  myGroup!: FormGroup;
  reporterId!:FormControl;
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
  filter_response :any[] = [];
  choice = 'Family';
  public arr = new Array(25);
  private reporter_id:any;
  all_team_list:any;
  product_all_team_list:any;
  constructor(public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.reporter_team_list();
    this.report_team_list();
    this.allgetlist();
    this.route.params.subscribe(params => {   
      this.id = params['id'];
      console.log('this.id',this.id);
   });
   this.route.params.subscribe(params => {
     this.a_list = params['view'];
     console.log('this.a_list',this.a_list);
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
    this.visible = true;
    this.isDisabled = false;
     this.isupdate = true;
     this.ishide = ! this.isShown;
     this.id_get();
   }
    this.FormControls();
  }

  //reporter get method 
  reporter_team_list(){
    this.apiService.getMethodwithToken(`/Reporters/IssueDetails`).subscribe((response: any) => {
      this.all_team_list = response;
      console.log('00000000000000000',response)
      this.filter_response = response;
    });
    }

     //team get method 
     report_team_list(){
      this.apiService.getMethodwithToken(`/Masters/ReporteeTeams`).subscribe((response: any) => {
        this.product_all_team_list = response;
        console.log('response',response);
      });
      }

  ionViewWillEnter(){
    this.date = new Date().toISOString();
    this.allgetlist();
    }
    allgetlist(){ 
      this.apiService.getMethodwithToken('/Reporters').subscribe((response: any) => {
        // this.filter_response = response;
        const a_id = Object.assign({},...response)
        this.reporter_id = a_id.id;
        this.array_reporter_team =  response.reduce((acc:any, val:any) => {
        if (!acc.find((el:any) => el.team === val.team)) {
          acc.push(val);
        }
        return acc;
      }, [])
      });
  }
  //id get method
  id_get(){
    console.log('edit');
    this.apiService.getMethodwithToken(`/Reportees/${this.id}`).subscribe((response: any) => {
      console.log('response111',response)
    const employee = response;
    this.reporterId.setValue(employee.reporterId.toString());
    this.issueName.setValue(employee.issueName);
    this.name.setValue(employee.name);
    this.reporteeTeamId.setValue(employee.reporteeTeamId.toString());
    this.briefIf.setValue(employee.briefIf);
    this.photos = employee.resolveImage;
    var searchlist = this.filter_response.filter((x:any) => x.reporterTeamId == employee.reporterId);
      this.array_reporter_list_of_issues = searchlist[0].issueList;
    });
  }
  triggerEvent(data:any){  
    this.isDisabled = false;
      var searchlist = this.filter_response.filter((x:any) => x.reporterTeamId == data.target.value);
      this.array_reporter_list_of_issues = searchlist[0].issueList;
  }
  FormControls() {
    this.reporterId = new FormControl('', [Validators.required]);
    this.issueName = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.reporteeTeamId = new FormControl('', [Validators.required]);
    this.briefIf = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      reporterId:this.reporterId,
      issueName:this.issueName,
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
            "resolveImage": this.photo_list,
            ...this.myGroup.value
        };
        console.log('employee',employee)
        if (this.a_list == 'edit') {
          if (this.myGroup.value !== undefined) {
            console.log('edit',this.photo_list)
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
            this.myGroup.reset();
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
    console.log('this.photo_list',this.photos);
    console.log('this.photo_list',this.photo_list);
    // this.photo_list = capturedPhoto;
    // var a_list = Object.assign({},capturedPhoto);
    // this.photoss = a_list.webPath;
    this.visible = true;
    // this.photos = this.sanitizer.bypassSecurityTrustResourceUrl(this.photoss);
    // console.log('this.photos',this.photos)
  }
}
