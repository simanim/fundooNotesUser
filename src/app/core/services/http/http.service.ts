import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) { }

  getData(path,token){
    return this.http.get(path,token);
  }
  postData(path,body,token){
    return this.http.post(path,body,token);
  }
  deleteData(path){
    return this.http.delete(path);
  }

}
