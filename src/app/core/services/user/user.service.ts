import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
    var path=environment.baseUrl+"/user/reset";
    return this.service.postData(path,body,{});
  }
  userLogin(body){
    var path=environment.baseUrl+"/user/login";
    return this.service.postData(path,body,{});
  }
  userLogout(){
    var path=environment.baseUrl+"/user/logout";
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
  addProfileImage(body){
    var path=environment.baseUrl+'/user/uploadProfileImage';
    return this.service.postData(path,body,this.httpAuthOptions2);
  }
  resetPassword(body,id){
    var path=environment.baseUrl+"/user/reset-password";
    var httpAuthOptions3 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': id
      })
    };
    return this.service.postData(path,body,httpAuthOptions3);
  }
  getService(){
    var path=environment.baseUrl+"/user/service";
    return this.service.getData(path,{});
  }
  userSignup(body){
    var path=environment.baseUrl+"/user/userSignUp";
    return this.service.postData(path,body,{});
  }
}
