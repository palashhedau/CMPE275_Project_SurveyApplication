import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('email') email: NgModel;
  @ViewChild('password') password: NgModel;
  public errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    const _this = this;
    this.authService.login(this.email.value, this.password.value).subscribe(
      (response) => {
        if(typeof response === 'object' && response.code === 200){
          _this.authService.setLoggedIn();
          _this.router.navigate(['/survey']);
        } else if(typeof response === 'object' && ( response.code === 404 || response.code === 400 )){
          // error message
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Internal Server Error';
      }
    );
  }

}
