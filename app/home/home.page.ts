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
  list_of_product: any =[{}];
  constructor(public apiService: ApiService,private authsetvice: AuthService) {}
  slidesOptions ={
    slidesPerView: 1.5
  }
  ngOnInit() {
    this.name = this.authsetvice.getname();
    console.log('name',name);
    this.apiService.getMethodwithToken('/Dashboards').subscribe((response: any) => {
      this.list_of_product = response;
      console.log('response***********',response)
    });
  }

}
