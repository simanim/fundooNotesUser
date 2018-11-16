import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) { }

/**
 *@description post methods
 */
  postData(path,body){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem("fundooUserToken")
      })
    };
    return this.http.post(environment.baseUrl+path,body,httpAuthOptions);
  }
  postDataForJSON(path,body){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("fundooUserToken")
      })
    };
    return this.http.post(environment.baseUrl+path,body,httpAuthOptions);
  }
  postDataForEncoded(path,body){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("fundooUserToken")
      })
    };
    return this.http.post(environment.baseUrl+path,body,httpAuthOptions);
  }
  postDataWithoutToken(path,body){
    return this.http.post(environment.baseUrl+path,body,{});
  }
/*******************************************************************/

/**
 *@description delete methods
 */
  deleteData(path){
    return this.http.delete(environment.baseUrl+path);
  }
/*******************************************************************/

/**
 *@description get methods
 */
  getData(path){
    return this.http.get(environment.baseUrl+path,{});
  }
  getData2(path){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("fundooUserToken")
      })
    };
    return this.http.get(environment.baseUrl+path,httpAuthOptions);
  }
/*******************************************************************/

}
