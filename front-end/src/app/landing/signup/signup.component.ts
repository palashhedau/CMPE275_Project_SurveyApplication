import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('email') email: ngModel;
  @ViewChild('password') password: ngModel;
  @ViewChild('confirmpassword') confirmpassword: ngModel;

  public errorMessage = '';
  public category = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  setCategory(category: string){
    this.category = category;
  }

  register() {
    this.errorMessage = '';

    if (this.email.valid === false) {
      this.errorMessage = 'Please check your email';
      return;
    }

    if(this.password.dirty === false){
      this.errorMessage = 'Please enter password';
      return;
    }

    if (!(this.password.value === this.confirmpassword.value)) {

      this.errorMessage = 'Passwords do not match';
      return;
    }

    if(this.category === ''){
      this.errorMessage = 'Please select category';
      return;
    }

    const _this = this;
    this.authService.register(this.email.value, this.password.value, this.category).subscribe(
      (response) =>{
        if(response.code === 201){
          _this.router.navigate(['signup', 'check-email-confirmation']);
        }else{
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Error occured while registering';
      }
    )
  }


}
