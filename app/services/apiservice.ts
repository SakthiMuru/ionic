import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {  HttpHeaders } from "@angular/common/http";
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public authToken: string='';
  
  //local .net 
  private a_baseurl:string ="https://localhost:7018/api";
  //live base url .net
  // private a_baseurl:string = "https://singsungapi.azurewebsites.net/api";
  // local nodejs
  // private a_baseurl:string ="http://localhost:2000";
  //node js
  // private a_baseurl:string ="https://dull-turtleneck-shirt-pike.cyclic.app";
  private headers: any = {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'auth': localStorage.getItem('token')}
     };
  public token:null | string = localStorage.getItem("token");
  constructor(private httpclient: HttpClient) { 
  }
  registation_without_token(webURL:any,data:any){
     const optionsAuth = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'in-auth-token': this.authToken }),};
     console.log('1111111111',optionsAuth)
     const url = `${this.a_baseurl}${webURL}`;
     return from(this.httpclient.post(url, data,<Object>optionsAuth)).pipe(map((data: any) => { 
     return data; 
    }));
  }
  
   //login post method
   login_without_token(webURL:any,data:any){
     const optionsAuth = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'in-auth-token': this.authToken }),};
     const url = `${this.a_baseurl}${webURL}`;
     return from(this.httpclient.post(url, data,<Object>optionsAuth)).pipe(map((data: any) => { 
      localStorage.setItem('name',data.name);
      localStorage.setItem('token',data.token);
     localStorage.setItem('refreshToken',data.refreshToken);
     return data; 
    }));
  }

    //post method
    post(webURL: any, data: any) {
    const url = `${this.a_baseurl}${webURL}`;
    // const token = localStorage.getItem("token");
    // const optionsAuth = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'auth': `${token}` }),};
    //   console.log('1111111111',optionsAuth)
    // return from(this.httpclient.post(url, data, <Object>optionsAuth)).pipe(map((data: any) => { return data; }));
    return from(this.httpclient.post(url, data)).pipe(map((data: any) => { return data; }));
    }
    //edit method
    edit(webURL: any, data: any) {
      const url = `${this.a_baseurl}${webURL}`;
      return from(this.httpclient.put(url, data)).pipe(map((data: any) => { return data; }));
      }
    //getmethod 
    getMethodwithToken(webURL: any) {
    const url = `${this.a_baseurl}${webURL}`;
    // const token = localStorage.getItem("token");
    // console.log('this.token1111111111111111111111111111',token)
    // const optionsAuth = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'auth': `${token}` })};
    // return from(this.httpclient.get(url, optionsAuth)).pipe(map((data:any) =>{return data}));
    return from(this.httpclient.get(url)).pipe(map((data:any) =>{
      console.log("url", url);
      
      try {
       if (data) {
        return data
       } 
      } catch (error) {
        
      }
    }));
    }
    getMethodwithToken_Excel(webURL: any) {
      const url = `${this.a_baseurl}${webURL}`;
      return this.httpclient.get(url, { responseType: 'blob' });
      }
    //delete method
    deleteMethodwithToken(webURL: any){
    const url = `${this.a_baseurl}${webURL}`;
    return from(this.httpclient.delete(url)).pipe(map((data:any) =>{return data}));
    }
}
