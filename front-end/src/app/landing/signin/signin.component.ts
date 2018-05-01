import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('email') email: NgModel;
  @ViewChild('password') password: NgModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email.value, this.password.value).subscribe(
      (response) => {
        console.log('Palash');
        console.log(response);

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
