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
  final_approval!: FormControl;
  brief_if!: FormControl;
  reportee_team!: FormControl;
  reportee_countermeasure_brief_if!: FormControl;
  visible:boolean = false;
  a_list:any;
  id:any;
  ishideview = true;
  isShown: boolean = true;
  ishide: boolean = true;
  array_reporter_list_of_issues:any;
  filter_response :any[] = [];
  array_reporter_team :any;
  private reporter_id:any;
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
    }
    triggerEvent(data:any){  
      this.isDisabled = false;  
        var searchlist = this.filter_response.filter((x:any) => x.team == data.target.value);
        this.array_reporter_list_of_issues = searchlist;
   
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
    console.log('employee',employee)
    this.reportee_team.setValue(employee.reportee_team);
    this.reportee_countermeasure_brief_if.setValue(employee.reportee_countermeasure_brief_if);
    this.final_approval.setValue(employee.final_approval);
    this.brief_if.setValue(employee.brief_if);

    console.log('this.filter_response1111111111111111111111',this.filter_response)
    var searchlist = this.filter_response.filter((x:any) => x.reportee_team == employee.reporter_name);
      this.array_reporter_list_of_issues = searchlist;
      console.log('this.eee',searchlist)
    });
  }
  FormControls() {
    this.reportee_team = new FormControl('', [Validators.required]);
    this.reportee_countermeasure_brief_if = new FormControl('', [Validators.required]);
    this.final_approval = new FormControl('', [Validators.required]);
    this.brief_if = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      reportee_team: this.reportee_team,
      reportee_countermeasure_brief_if: this.reportee_countermeasure_brief_if,
      final_approval: this.final_approval,
      brief_if: this.brief_if
    });
  }
  submit() {
    console.log('this.myGroup.value',this.myGroup.value)
        if (this.myGroup.invalid) {
          // this.message = 'Invalid data';
          return;
        }
        let employee = {
          "reporter_id": this.reporter_id,
          ...this.myGroup.value
      };
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
