import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import * as XLSX from 'xlsx';
// import { File } from '@ionic-native/file/ngx';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { ApiService } from '../services/apiservice';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  arr:any[]=[];
  formGroup!: FormGroup;
  name: string = '';
  list: Array<any> = [];
  temp_list: Array<any>=[];
  fileName: string = 'SheetJS.xlsx';
  getlist:any[] =[];
  spinner = true;
  constructor(private toastController: ToastController,private alertCtrl:AlertController,public apiService: ApiService,public http: HttpClient,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.get();
    this.formGroup = this.formBuilder.group({
    formGroupProperty: ''
    });
    for(var i = 0; i<100;i++)
    {
      var obj = {id:"id"+i.toString(),name:"name"+i.toString(),email:"email"+i.toString()};
      this.arr.push(obj);
    }
  }
  ionViewWillEnter(){
  this.get();
  }
  get(){ 
    this.apiService.getMethodwithToken('/Approvals').subscribe((response: any) => {
    this.spinner = false;
    this.list = response;
    this.temp_list = this.list;
    });
}
  // edit(id:any){
  //   this.router.navigate(["add-approval", id]);
  // }
  // view(id:any){
  //   this.router.navigate(["add-approval", id]);
  // }

  //delete method
  // delete(id:any){
  //   this.apiService.deleteMethodwithToken(`/Approvals/${id}`).subscribe((response: any) => {
  //     this.get();
  //     this.temp_list = this.list;
  //     });
  // }
  async excel(list:any){
    this.apiService.getMethodwithToken_Excel('/Excel/Approvals').subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', "downloadexcel.xlsx");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }


  fireFilterEvent(event: any) {
    if (event.target.value != '') {
      console.log('a_list',event.target.value)      
      var searchlist = this.list.filter(x => {
         return x.final_approval.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase());
        });
         this.list = searchlist;
         console.log('searchlist',searchlist)
    }else{
    this.list = this.temp_list;
    }
  }

  filter(){
    // this.name = 'Nancy';
    this.list
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
  async confirmdelete(id:any) {
    let alert = await this.alertCtrl.create({
      message: 'Do you confirm to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.apiService.deleteMethodwithToken(`/Approvals/${id}`).subscribe((response: any) => {
              this.presentToast('Deleted successfully');
              this.get();
              this.temp_list = this.list;
              });
          }
        }
      ]
    });
    alert.present();
  }
}
