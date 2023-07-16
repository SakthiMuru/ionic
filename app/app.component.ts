import { Component,OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  name:any ="";
  constructor(public authService:AuthService,private menu: MenuController) {
    defineCustomElements(window);
  }
  ngOnInit() {
    this.name = this.authService.getname();
    console.log('name',name);
  }
  logout() {  
    localStorage.removeItem("token");
    this.menu.close();
    }
    reporter(){
      this.menu.close();  
    }
}
