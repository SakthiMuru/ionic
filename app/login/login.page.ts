import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ApiService} from '../services/apiservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myGroup!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  constructor(public authService: AuthService,private router: Router) {
    this.FormControls();
   }

  ngOnInit() {
   
  }
  submit() {
console.log('',this.myGroup.value)
    if (this.myGroup.invalid) {
      // this.message = 'Invalid data';
      return;
    }
    this.post(this.myGroup.value);
  }
  post(data:any){
    console.log('3434',data)
    this.authService.login('/users/login',data).subscribe((response: any) => {
      this.myGroup.reset();
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
}
