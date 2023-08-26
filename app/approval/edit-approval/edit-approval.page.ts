import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/apiservice';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-approval',
  templateUrl: './edit-approval.page.html',
  styleUrls: ['./edit-approval.page.scss'],
})
export class EditApprovalPage implements OnInit {
  
  photo_list:any;
  isupdate = false;
  isview = false;
  isDisabled:boolean = true;
  date:any;
  post_method:any = [];
  myGroup!: FormGroup;
  status!: FormControl;
  briefIf!: FormControl;
  reporterTeamId!: FormControl;
  reporterId!: FormControl;
  reporteeId!: FormControl;
  visible:boolean = true;
  reportee_visible:boolean = true;
  a_list:any;
  id:any;
  ishideview = true;
  isShown: boolean = true;
  is_edit_Shown: boolean = false;
  ishide: boolean = true;
  array_reporter_list_of_issues:any;
  filter_response :any[] = [];
  array_reporter_team :any;
  private reporter_id:any;
  reporter_team_list:any;
  reporter_list:any;
  reporter_list_of_issues:any;
  reportee_list_of_issues:any;
  photos:any;
  reportee_photos:any;
  reporter_team_name:any;
  reporter_brief:any;
  reporter_img:any;
  reportee_name:any;
  reportee_brief:any;
  reportee_img:any;
  view_status:any;
  view_briefIf:any;
  employee:any;
  spinner = false;
  constructor(private toastController: ToastController,public http: HttpClient,public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.allgetlist();
    this.FormControls();
    this.route.params.subscribe(params => {   
       this.id = params['id'];
    });
    this.route.params.subscribe(params => {
      this.a_list = params['view'];
    });
   if (this.a_list == "edit") {
    this.spinner = true;
      this.id_get();
    } 
  }
  ionViewWillEnter(){
    this.allgetlist();
    this.report_team_list();
    }

      //team get method 
      report_team_list(){
        this.spinner = true;
        this.apiService.getMethodwithToken(`/Masters/GetReporterTeamListWhichHasAvailableReport`).subscribe((response: any) => {
          this.spinner = false;
        this.reporter_team_list = response;
        });
        }

    triggerEvent(data:any){
      if(data.target.value){
        this.spinner = true;
      this.apiService.getMethodwithToken(`/Reporters/GetListOfReporterByReporterTeamId/${data.target.value}`).subscribe((response: any) => {
        this.spinner = false;
      this.isDisabled = false; 
      this.reporter_list_of_issues = response;  
    });
      }
    }
    reporter_triggerEvent(data:any){  
      if(data.target.value.id){
        this.spinner = true;
        this.visible = true;
        this.reporterId = data.target.value.id;
        this.photos = data.target.value.issueImage;
        this.apiService.getMethodwithToken(`/Reportees/GetListOfReporteeByReporterId/${data.target.value.id}`).subscribe((response: any) => {
          this.spinner = false;
          this.reportee_list_of_issues = response;
      });
      }      
  }

  reportee_triggerEvent(data:any){  
    if(data.target.value.id){
      this.reporteeId = data.target.value.id;
      this.reportee_visible = true;
      this.reportee_photos = data.target.value.resolveImage;
    }
    
}
  // alldata
  allgetlist(){ 
    this.apiService.getMethodwithToken('/Reportees').subscribe((response: any) => {
      this.spinner = false;
      this.filter_response = response;
      const a_id = Object.assign({},...response)
        this.reporter_id = a_id.id;
      this.array_reporter_team =  response.reduce((acc:any, val:any) => {
        if (!acc.find((el:any) => el.team === val.team)) {
          acc.push(val);
        }
        console.log('this.array_reporter_team',this.array_reporter_team)
        return acc;
      }, [])
    });
}

  //id get method
  id_get(){
    this.spinner = true;
    this.apiService.getMethodwithToken(`/Approvals/${this.id}`).subscribe((response: any) => {
    this.employee = response;
    this.spinner = false;
    if(this.ishide){
      if (response.reporter.issueImage == null) {
        console.log('1111111111');
        this.visible = false;
        this.reporter_img = response.reporter.issueImage;
      }else{
        console.log('2222222');
        this.reporter_img = response.reporter.issueImage;
      }
      if (response.reportee.resolveImage == null) {
        console.log('333333333');
        this.reportee_visible = false;
        this.reportee_img = response.reportee.resolveImage;
      }else{
        console.log('4444444');
        this.reportee_img = response.reportee.resolveImage;
      }
      
      this.reporter_team_name = response.reporterTeam.name;
      this.reporter_brief = response.reporter.briefIf;
      // this.reporter_img = response.reporter.issueImage;
      this.reportee_name = response.reportee.name;
      this.reportee_brief = response.reportee.briefIf;
      // this.reportee_img = response.reportee.resolveImage;
      this.status.setValue(this.employee.status);
      this.briefIf.setValue(this.employee.briefIf);
      
    }
    });
  }
  FormControls() {
    this.reporterTeamId = new FormControl('', [Validators.required]);
    this.reporterId = new FormControl('', [Validators.required]);
    this.reporteeId = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);
    this.briefIf = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      reporterTeamId: this.reporterTeamId,
      reporterId: this.reporterId,
      reporteeId: this.reporteeId,
      status: this.status,
      briefIf: this.briefIf
    });
  }
  submit() {
    
        if (this.myGroup.invalid) {
          // this.message = 'Invalid data';
          return;
        }
        
          var all_data = Object(this.employee);
          all_data.status = this.myGroup.value.status; 
          all_data.briefIf = this.myGroup.value.briefIf;
        if (this.a_list == 'edit') {
          if (this.myGroup.value !== undefined) {
            this.edit(this.employee,this.id);
          } 
        }
      }
     
      //edit method
      edit(list:any,id:any){
        this.spinner = true;
        this.apiService.edit(`/Approvals/${id}`,list).subscribe((response: any) => {
          this.presentToast('Updated successfully');
          this.spinner = false;
          this.router.navigate(['/approval']);
          this.myGroup.reset();
        });
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
