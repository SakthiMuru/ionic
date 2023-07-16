import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { ApiService } from '../services/apiservice';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  formGroup!: FormGroup;
  name: string = '';
  list: Array<any> = [];
  temp_list: Array<any>=[];
  fileName: string = 'SheetJS.xlsx';
  getlist:any[] =[];
  constructor(public apiService: ApiService,public http: HttpClient,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.get();
    this.formGroup = this.formBuilder.group({
    formGroupProperty: ''
    });
  }
  ionViewWillEnter(){
  this.get();
  }
  get(){ 
    this.apiService.getMethodwithToken('/Approvals').subscribe((response: any) => {
      console.log('22222222222',response)
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
  delete(id:any){
    this.apiService.deleteMethodwithToken(`/Approvals/${id}`).subscribe((response: any) => {
      this.get();
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
}
