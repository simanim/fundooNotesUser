import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL="http://34.213.106.173/api";
  constructor(private http: HttpClient) { }

  getData(value){
    return this.http.get(this.URL+"/"+value);
  }

}