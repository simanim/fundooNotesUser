import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public card=[];
  constructor(private myFirstService : HttpService) { }

  ngOnInit() {
    let obs = this.myFirstService.getData("/user/service"); 
    obs.subscribe((response) => {
      console.log(response["data"]);
      for(let i=0;i<response["data"].data.length;i++)
      {
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
      console.log(this.card);
    });
  }

  response(data){
    data.select=!data.select;
    for(var j=0;j<this.card.length;j++)
    {
      if(data.name==this.card[j].name)
      continue;
      this.card[j].select=false;
    }console.log(this.card);
  }

}
