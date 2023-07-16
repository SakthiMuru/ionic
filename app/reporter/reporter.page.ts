import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/apiservice';
@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.page.html',
  styleUrls: ['./reporter.page.scss'],
})
export class ReporterPage implements OnInit {
  formGroup!: FormGroup;
  name: string = '';
  list: Array<any> = [];
  temp_list: Array<any>=[];
  fileName: string = 'SheetJS.xlsx';
  constructor(public apiService: ApiService,private formBuilder: FormBuilder,private router: Router) { }

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
        console.log('response',response)
      this.list = response;
      this.temp_list = this.list;
      });
  }
 
   //delete method
   delete(id:any){
    this.apiService.deleteMethodwithToken(`/Reporters/${id}`).subscribe((response: any) => {
      this.allgetlist();
      this.temp_list = this.list;
      });
  }
  async excel(list:any){
  console.log('list',list);
   /* generate worksheet */
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list, {header: [], skipHeader: false});

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
}
