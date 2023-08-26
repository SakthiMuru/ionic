import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/apiservice';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.page.html',
  styleUrls: ['./reporter.page.scss'],
})
export class ReporterPage implements OnInit {
  formGroup!: FormGroup;
  name: string = '';
  spinner = true;
  list: Array<any> = [];
  temp_list: Array<any>=[];
  fileName: string = 'SheetJS.xlsx';
  constructor(private alertCtrl:AlertController,private toastController: ToastController,public apiService: ApiService,private formBuilder: FormBuilder,private router: Router) { }

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
      this.apiService.getMethodwithToken('/Reporters').subscribe((response: any) => {
      this.spinner = false;
      this.list = response;
      this.temp_list = this.list;
      });
  }
 
   //delete method
  
  async excel(list:any){
  console.log('list',list);
  var listdata = list.map((datum:any) => {
    return {
      'briefIf':datum.briefIf,
      'id':datum.id,
      'issueDate':datum.issueDate,
      'issueLevel':datum.issueLevel.name,
      'issueLocation':datum.issueLocation,
      'name':datum.name,
      'reporterTeam':datum.reporterTeam.name,
      'responsibleTeam':datum.responsibleTeam.name,
      'status':datum.status,
      'targetDate':datum.targetDates
    }
  });
   /* generate worksheet */
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listdata, {header: [], skipHeader: false});

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.fileName);


  }
  fireFilterEvent(event: any) {
    if (event.target.value != '') {
      console.log('a_list',event.target.value)      
      var searchlist = this.list.filter(x => {
         return x.name.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase());
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
            this.apiService.deleteMethodwithToken(`/Reporters/${id}`).subscribe((response: any) => {
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
