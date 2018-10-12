import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL="http://34.213.106.173/api";
  constructor(private http: HttpClient) { }

  getData(path){
    return this.http.get(this.URL+"/"+path);
  }

  postData(path,body){
    return this.http.post(this.URL+"/"+path,body);
  }

  // postDataReset(path,body,id){
  //   console.log(id);
  //   const httpOptions = {
  //     headers:new HttpHeaders({
  //       "content-type": "application/json",
  //       "Authorization":id
  //     })
  //   };
  //   console.log(httpOptions)
  //   return this.http.post(this.URL+"/"+path,body,httpOptions);
  // }

  postDataReset(adress,bodydata,acessToken)
  {
    console.log(acessToken);
    console.log(bodydata);
    
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': acessToken
      })

    };
    
  
    return this.http.post(this.URL+"/"+adress,this.getFormUrlEncoded(bodydata),httpAuthOptions1)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }


}