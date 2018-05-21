import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-sign-up-enter-code',
  templateUrl: './sign-up-enter-code.component.html',
  styleUrls: ['./sign-up-enter-code.component.css']
})
export class SignUpEnterCodeComponent implements OnInit {
  @ViewChild('email') email: NgModel;
  @ViewChild('code') code: NgModel;
  public errorMessage = '';
  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  activateAccount(){
    this.errorMessage = '';
    if(this.email.valid === false){
      this.errorMessage = 'Please enter valid email address';
      return;
    }

    console.log(this.code.valid);
    if(this.code.valid === false){
      this.errorMessage = 'Please enter activation code';
      return;
    }

    const _this = this;
    this.authService.activate(this.email.value, this.code.value).subscribe(
      (response) => {
        if (response.code === 200 ){
          _this.router.navigate(['signup', 'success']);
        } else {
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        console.log(error)
        _this.errorMessage = 'Internal Server Error Occurred. Please try after sometime';
      }
    );

  }


}
