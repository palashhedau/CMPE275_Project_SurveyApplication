import {Component, OnInit} from '@angular/core';
import {AuthService} from './landing/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(){}

  ngOnInit() {
    /*this.authService.checkSession();*/
  }

}
