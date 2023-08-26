import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {formatDate} from '@angular/common';
import { ApiService } from 'src/app/services/apiservice';
import { ToastController } from '@ionic/angular';
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
@Component({
  selector: 'app-add-reporter',
  templateUrl: './add-reporter.page.html',
  styleUrls: ['./add-reporter.page.scss'],
})
export class AddReporterPage implements OnInit {
  d_of_report = new Date().toISOString();
  t_date = new Date().toISOString();  
  public photos:any = [];
  public photoss:any = [];
  ishideview = true;
  isview = false;
  photo_list:any;
  post_method:any = [];
  myGroup!: FormGroup;
  name!: FormControl;
  reporterTeamId!: FormControl;
  issueDate!: FormControl;
  issueLevelId!: FormControl;
  issueLocation!: FormControl;
  responsibleTeamId!: FormControl;
  targetDate!: FormControl;
  briefIf!: FormControl;
  visible:boolean = false;
  birthDate:any;
  id:any;
  isShown: boolean = true;
  ishide: boolean = true;
  visible_view: boolean = true;
  a_list:any;
  isupdate = false;
  public ImgUrl:any;
  private token = localStorage.getItem('token');
  all_team_list : any;
  all_responsibleteams_list :any;
  datalist: any;
  all_issues_level_list:any;
  issueImage:any;
  spinner = false;
  constructor(private toastController: ToastController,public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.issues_level_list();
    this.report_team_list(); 
    this.responsible_list_team_list();
    this.d_of_report = new Date().toISOString();
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
    this.ishideview = false;
    this.isview = true;
    this.spinner = true;
     this.id_get();
     this.isShown = ! this.isShown;
   }else if (this.a_list == "edit") {
    this.ishideview = true;
    this.isview = false;
    this.spinner = true;
     this.isupdate = true;
     this.ishide = ! this.isShown;
     this.visible = true;
     this.id_get();
   } 
  }
  ionViewWillEnter(){
     this.id_get();
    }
    
    //team get method 
    report_team_list(){
      this.spinner = true;   
      this.apiService.getMethodwithToken(`/Masters/ReporterTeams`).subscribe((response: any) => {
      this.spinner = false;
      this.all_team_list = response;
    });
    }

    issues_level_list(){
      this.spinner = true;
      this.apiService.getMethodwithToken(`/Masters/IssueLevels`).subscribe((response: any) => {
        this.spinner = false;
        this.all_issues_level_list = response;
      });
      }
     
    responsible_list_team_list(){
      this.spinner = true;
      this.apiService.getMethodwithToken(`/Masters/ResponsibleTeams`).subscribe((response: any) => {
        this.spinner = false;
        this.all_responsibleteams_list = response;
      });
      }
  //id get method
  id_get(){
    this.apiService.getMethodwithToken(`/Reporters/${this.id}`).subscribe((response: any) => {
    this.spinner = false;
    const employee = response;
    this.name.setValue(employee.name);
    this.d_of_report = employee.issueDate;
    this.issueLevelId.setValue(employee.issueLevelId.toString());
    this.responsibleTeamId.setValue(employee.responsibleTeamId.toString());
    this.issueLocation.setValue(employee.issueLocation);
    this.t_date = employee.targetDate;
    this.reporterTeamId.setValue(employee.reporterTeamId.toString());
    this.briefIf.setValue(employee.briefIf);
    if (employee.issueImage == null) {
      this.visible_view = false;
      this.visible = false;
      this.photos = employee.issueImage;
    }else{
      this.photos = employee.issueImage;
    }
    this.issueImage = employee.issueImage;
    });
  }
  FormControls() {
    this.name = new FormControl('', [Validators.required]);
    this.reporterTeamId = new FormControl('', [Validators.required]);
    this.issueDate = new FormControl('', []);
    this.issueLevelId = new FormControl('', [Validators.required]);
    this.issueLocation = new FormControl('', [Validators.required]);
    this.responsibleTeamId = new FormControl('', [Validators.required]);
    this.targetDate = new FormControl('', []);
    this.briefIf = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      name: this.name,
      reporterTeamId: this.reporterTeamId,
      issueDate: this.issueDate,
      issueLevelId: this.issueLevelId,
      issueLocation: this.issueLocation,
      responsibleTeamId: this.responsibleTeamId,
      targetDate: this.targetDate,
      briefIf: this.briefIf
    });
  }
  submit() {
    console.log("this.myGroup.value",this.myGroup.value)
    this.myGroup.value.issueDate = this.d_of_report;
    this.myGroup.value.targetDate = this.t_date;
        if (this.myGroup.invalid) {
          // this.message = 'Invalid data';
          return;
        }
    if (typeof this.myGroup.value.targetDate == "string" && typeof this.myGroup.value.issueDate == "string") {
      this.myGroup.value.targetDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
      this.myGroup.value.issueDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    }
    if (typeof this.myGroup.value.targetDate !== "string" && typeof this.myGroup.value.issueDate !== "string") {
      this.myGroup.value.targetDate = formatDate(this.myGroup.value.targetDate, 'dd/MM/yyyy', 'en');
      this.myGroup.value.issueDate = formatDate(this.myGroup.value.issueDate, 'dd/MM/yyyy', 'en');
    }
        if (this.myGroup.value !== undefined) {
          this.myGroup.value.issueDate = this.d_of_report;
          this.myGroup.value.targetDate = this.t_date;
          let employee = {
            "issueImage": this.issueImage,
            ...this.myGroup.value
        };
        // 
        console.log('this.photos',employee)

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
      post(list:any){
        this.spinner = true;
          this.apiService.post('/Reporters',list).subscribe((response: any) => {
            this.spinner = false;
            this.presentToast('Added successfully');
            this.router.navigate(['/reporter']);
            this.myGroup.reset();
            this.visible = false;
            this.d_of_report = new Date().toISOString();
            this.t_date = new Date().toISOString();
          });
      }
       //edit method
       edit(list:any,id:any){
        this.spinner = true;
        this.apiService.edit(`/Reporters/${id}`,list).subscribe((response: any) => 
        {
          this.spinner = false;
          this.presentToast('Updated successfully');
          this.router.navigate(['/reporter']);
          this.myGroup.reset();
        });
      }
 public async addPhotoToGallery() {
    const capturedPhoto:Photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: true,
    });
    var imageUrl = capturedPhoto.base64String;
    this.photo_list = "data:image/jpeg;base64," + imageUrl;
    this.photos = this.sanitizer.bypassSecurityTrustResourceUrl(this.photo_list);
    console.log('this.photo_list',this.photos);
    // console.log('this.photos11', capturedPhoto)
    // var a_list = Object.assign({},capturedPhoto);
    // this.photoss = a_list.webPath;
    this.visible = true;
    this.issueImage = this.photo_list;
    // this.photos = this.sanitizer.bypassSecurityTrustResourceUrl(this.photoss);
    // console.log('this.photos11', this.photos)
  }
  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg, 
      color: 'primary',
      position: 'top',
      cssClass:'toast-bg',
      duration: 2000 
    });
    toast.present();
  }
}
