import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiservice';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  name:any ='';
  spinner = true;
  list_of_product: any =[{}];
  constructor(public apiService: ApiService,private authsetvice: AuthService) {}
  slidesOptions ={
    slidesPerView: 1.5
  }
  ngOnInit() {
    this.all_get_data();
  }
  ionViewWillEnter(){
     this.all_get_data();
    }
  all_get_data(){
    this.name = this.authsetvice.getname();
    this.apiService.getMethodwithToken('/Dashboards').subscribe((response: any) => {
      this.spinner = false;
      this.list_of_product = response;
    });
  }
}
