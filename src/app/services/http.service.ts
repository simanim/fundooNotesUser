import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL="http://34.213.106.173/api";
  constructor(private http: HttpClient) { }

  getData(value1){
    return this.http.get(this.URL+"/"+value1);
  }

  postData(value2,body){
    return this.http.post(this.URL+"/"+value2,body);
  }

}