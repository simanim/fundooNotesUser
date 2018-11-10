import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL="http://34.213.106.173/api";
  public token=localStorage.getItem("fundooUserToken");
  public httpAuthOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };
  public httpAuthOptions2 = {
    headers: new HttpHeaders({
      'Authorization': this.token
    })
  };
  
  constructor( private service: HttpService,private http: HttpClient ) { }

  forgotPassword(body){
    var path=this.URL+"/user/reset";
    return this.service.postData(path,body,{});
  }
  userLogin(body){
    var path=this.URL+"/user/login";
    return this.service.postData(path,body,{});
  }
  userLogout(){
    var path=this.URL+"/user/logout";
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
  addProfileImage(body){
    var path=this.URL+'/user/uploadProfileImage';
    return this.service.postData(path,body,this.httpAuthOptions2);
  }
  resetPassword(body,id){
    var path=this.URL+"/user/reset-password";
    var httpAuthOptions3 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': id
      })
    };
    return this.service.postData(path,body,httpAuthOptions3);
  }
  getService(){
    var path=this.URL+"/user/service";
    return this.service.getData(path,{});
  }
  userSignup(body){
    var path=this.URL+"/user/userSignUp";
    return this.service.postData(path,body,{});
  }
}
