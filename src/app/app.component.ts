import { Component ,OnInit} from '@angular/core';
import { FirebaseService } from './core/services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fundoo';
  constructor( private appService : FirebaseService ){}
  ngOnInit(){
    this.appService.getPermission()
  }
}
