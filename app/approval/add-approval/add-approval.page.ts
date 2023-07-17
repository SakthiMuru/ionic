import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/apiservice';
import { HttpClient,HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-add-approval',
  templateUrl: './add-approval.page.html',
  styleUrls: ['./add-approval.page.scss'],
})
export class AddApprovalPage implements OnInit {
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
  visible:boolean = false;
  reportee_visible:boolean = false;
  a_list:any;
  id:any;
  ishideview = true;
  isShown: boolean = true;
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
  constructor(public http: HttpClient,public apiService: ApiService,private sanitizer: DomSanitizer,public photoService: PhotoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.allgetlist();
    this.FormControls();
    this.route.params.subscribe(params => {   
       this.id = params['id'];
    });
    this.route.params.subscribe(params => {
      this.a_list = params['view'];
    });
    console.log('0000000000000',this.a_list)
    if (this.a_list !== "edit" && this.a_list !== "view") {
      this.ishide = ! this.isShown;
    }
    if (this.a_list == "view") {
      this.id_get();
      this.ishideview = false;
      this.isview = true;
      this.isShown = ! this.isShown;
    }else if (this.a_list == "edit") {
      this.isupdate = true;
      this.isDisabled = false;
      this.ishide = ! this.isShown;
      this.id_get();
    } 
  }
  ionViewWillEnter(){
    this.allgetlist();
    this.report_team_list();
    }

      //team get method 
      report_team_list(){
        this.apiService.getMethodwithToken(`/Masters/GetReporterTeamListWhichHasAvailableReport`).subscribe((response: any) => {
        this.reporter_team_list = response;
        });
        }

    triggerEvent(data:any){
      if(data.target.value){
        console.log('data',data.target.value)
      this.apiService.getMethodwithToken(`/Reporters/GetListOfReporterByReporterTeamId/${data.target.value}`).subscribe((response: any) => {
      this.isDisabled = false; 
      this.reporter_list_of_issues = response;  
      console.log('response000000000',response);
    });
      }
    }
    reporter_triggerEvent(data:any){  
      if(data.target.value.id){
        this.visible = true;
        this.reporterId = data.target.value.id;
        console.log('this.reporterId11111',this.reporterId)
        this.photos = data.target.value.issueImage;
        this.apiService.getMethodwithToken(`/Reportees/GetListOfReporteeByReporterId/${data.target.value.id}`).subscribe((response: any) => {
        console.log('response111111',response);
        this.reportee_list_of_issues = response;
      });
      }      
  }

  reportee_triggerEvent(data:any){  
    if(data.target.value.id){
      this.reporteeId = data.target.value.id;
      console.log('this.reporteeId22222',this.reporteeId)
      console.log('data111',data.target.value)
      this.reportee_visible = true;
      this.reportee_photos = data.target.value.resolveImage;
    }
    
}
  // alldata
  allgetlist(){ 
    this.apiService.getMethodwithToken('/Reportees').subscribe((response: any) => {
      console.log('response',response)
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
    console.log('this.eee11111111')
    this.apiService.getMethodwithToken(`/Approvals/${this.id}`).subscribe((response: any) => {
    const employee = response;
    if(this.ishide){
      console.log('employee',employee)
      this.reporter_team_name = response.reporterTeam.name;
      this.reporter_brief = response.reporter.briefIf;
      this.reporter_img = response.reporter.issueImage;
      this.reportee_name = response.reportee.name;
      this.reportee_brief = response.reportee.briefIf;
      this.reportee_img = response.reportee.resolveImage;
      this.view_status = response.status;
      this.view_briefIf = response.briefIf;
    }
    // this.reporter_briefif = response.reporter.briefIf;
    this.reporterTeamId.setValue(employee.reporterTeamId);
    this.reporterId.setValue(employee.reporterId);
    this.status.setValue(employee.status);
    this.briefIf.setValue(employee.briefIf);

    console.log('this.filter_response1111111111111111111111',this.filter_response)
    var searchlist = this.filter_response.filter((x:any) => x.reporterTeamId == employee.reporter_name);
      this.array_reporter_list_of_issues = searchlist;
      console.log('this.eee',searchlist)
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
    console.log('this.myGroup.value',this.myGroup.value)
        if (this.myGroup.invalid) {
          // this.message = 'Invalid data';
          return;
        }
        let employee = {
          ...this.myGroup.value
      };
          var all_data = Object(employee);
           var a_reporterId = Object.create(all_data.reporterId);
           all_data.reporterId = a_reporterId.id; 
           var a_reporteeId = Object.create(all_data.reporteeId);
           all_data.reporteeId = a_reporteeId.id;
           all_data.status = all_data.status == "true" ? true : false;

           console.log('employee',employee)

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
      //post method
      post(list:any){
        console.log("6666666666666666",list)
        this.apiService.post('/Approvals',list).subscribe((response: any) => {
          console.log("3333444555",response)
          this.router.navigate(['/approval']);
          this.myGroup.reset();
        });
      }
      //edit method
      edit(list:any,id:any){
        console.log("7777777777777777",list)
        this.apiService.edit(`/Approvals/${id}`,list).subscribe((response: any) => {
          console.log("777777",response)
          this.router.navigate(['/approval']);
          this.myGroup.reset();
        });
      }
      
}
