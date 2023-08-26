import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/apiservice';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.page.html',
  styleUrls: ['./reschedule.page.scss'],
})
export class ReschedulePage implements OnInit {
  formGroup!: FormGroup;
  name: string = '';
  list: Array<any> = [];
  temp_list: Array<any>=[];
  fileName: string = 'SheetJS.xlsx';
  spinner = true;
  constructor(private toastController: ToastController,private alertCtrl:AlertController,public apiService: ApiService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.allgetlist();
    this.temp_list = this.list;
    this.formGroup = this.formBuilder.group({
      formGroupProperty: ''
    })
  }

  ionViewWillEnter(){
    this.allgetlist();
    }
    allgetlist(){ 
      this.spinner = true;
      this.apiService.getMethodwithToken('/Reportees/Reschedules').subscribe((response: any) => {
      this.spinner = false;
      this.list = response;
      this.temp_list = this.list;
      });
  }
 
   //delete method
  //  delete(id:any){
  //   this.apiService.deleteMethodwithToken(`/Reportees/${id}`).subscribe((response: any) => {
  //     this.allgetlist();
  //     this.temp_list = this.list;
  //     });
  // }
  async excel(list:any){
    this.apiService.getMethodwithToken_Excel('/Excel/Reschedules').subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', "Reschedules.xlsx");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }
  fireFilterEvent(event: any) {
    if (event.target.value != '') {
      console.log('a_list',event.target.value)      
      var searchlist = this.list.filter(x => {
         return x.reschedule_reporter_team.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase());
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
            this.apiService.deleteMethodwithToken(`/Reportees/${id}`).subscribe((response: any) => {
              this.presentToast('Deleted successfully');
              this.allgetlist();
              this.temp_list = this.list;
              });
          }
        }
      ]
    });
    alert.present();
  }
}
