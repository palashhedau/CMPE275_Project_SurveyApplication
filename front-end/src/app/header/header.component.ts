import {Component, OnInit} from '@angular/core';
import {AuthService} from './landing/auth.service';

@Component({
  selector: 'header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  title = 'app';
  constructor(){}

  ngOnInit() {
    /*this.authService.checkSession();*/
  }

}
