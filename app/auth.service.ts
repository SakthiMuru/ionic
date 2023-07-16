import { Injectable } from '@angular/core';
import { ApiService } from './services/apiservice';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: ApiService) { }
  getname(){
    return localStorage.getItem("name");
  }
  getAccessToken(){
    return localStorage.getItem("token");
  }
  refreshToken(){
    return localStorage.getItem("refreshToken");
  }
  // Clear the token from storage
  clearToken() {
    return localStorage.removeItem("token");
  }
login(base:any,data:any){
    return this.api.login_without_token(base,data)
}
post(base:any,data:any){
    return this.api.post(base,data)
}
}
