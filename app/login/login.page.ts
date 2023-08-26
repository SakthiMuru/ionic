import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ApiService} from '../services/apiservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myGroup!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  spinner = false;
  constructor(private toastController: ToastController,public authService: AuthService,private router: Router) {
    this.FormControls();
   }

  ngOnInit() {
   
  }
  submit() {
    this.spinner = true;
    if (this.myGroup.invalid) {
      // this.message = 'Invalid data';
      return;
    }
    this.post(this.myGroup.value);
  }
  post(data:any){
    this.authService.login('/users/login',data).subscribe((response: any) => {
      this.presentToast('Login successfully');
      this.myGroup.reset();
      this.spinner = false;
      this.router.navigate(['/home']);
    });
  }
  FormControls() {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.myGroup = new FormGroup({
      email: this.email,
      password: this.password,
    });
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
}
