import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ApiService} from '../services/apiservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  myGroup!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  storage:any;
  jwtHelper: any;
  userInfo: any;
  constructor(private toastController: ToastController,public api: ApiService,private router: Router) {
    this.FormControls();
   }

  ngOnInit() {
  }
  submit() {
    console.log('',this.myGroup.value)
        if (this.myGroup.invalid) {
        console.log('Please provide all the required values!')
        return ;
        }
        this.post(this.myGroup.value);
      }
      post(data:any){
        console.log('3434',data)
        this.api.registation_without_token('/users/registration',data).subscribe((response: any) => {
          this.presentToast('Registration successfully');
          console.log('response',response)
          this.myGroup.reset();
          this.router.navigate(['/login']);
          return of(response).pipe(
            map((token) => {
              if (!token) {
              return false;
              }
              this.storage.set('access_token',token);
              var decodedUser = this.jwtHelper.decodeToken(token);
              this.userInfo.next(decodedUser);
              console.log(decodedUser);
              return true;
            })
            );
           
          
         
        });
      }
      FormControls() {
        this.name = new FormControl('', [Validators.required,Validators.minLength(2)]);
        this.email = new FormControl('', [Validators.required]);
        this.password = new FormControl('', [Validators.required]);
        this.myGroup = new FormGroup({
          name: this.name,
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
