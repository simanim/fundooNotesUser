import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor( private service: HttpService ) { }

  forgotPassword(body){
    return this.service.postDataWithoutToken("/user/reset",body);
  }
  userLogin(body){
    return this.service.postDataWithoutToken("/user/login",body);
  }
  pushLogin(body){ 
    return this.service.postDataForJSON("/user/registerPushToken",body);
  }
  userLogout(){
    return this.service.postDataForJSON("/user/logout",{});
  }
  addProfileImage(body){
    return this.service.postData('/user/uploadProfileImage',body);
  }
  resetPassword(body){
    return this.service.postDataForEncoded("/user/reset-password",body);
  }
  getService(){
    return this.service.getData("/user/service");
  }
  userSignup(body){
    return this.service.postDataWithoutToken("/user/userSignUp",body);
  }
}
