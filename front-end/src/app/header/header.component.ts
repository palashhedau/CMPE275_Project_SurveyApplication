import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {AuthService} from '../landing/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, DoCheck, AfterContentChecked, AfterViewChecked
{

  public isLoggedIn = false;
  constructor(private authService : AuthService,
              private router : Router){}

  ngOnInit() {
    /*this.authService.checkSession();*/
    this.isLoggedIn = this.authService.isLoggedIn;
  }



  ngDoCheck(){
    this.isLoggedIn = this.authService.isLoggedIn;

  }

  ngAfterContentChecked(){
    this.isLoggedIn = this.authService.isLoggedIn;

  }

  ngAfterViewChecked(){
    this.isLoggedIn = this.authService.isLoggedIn;

  }




  logout(){
      this.authService.logout().subscribe(
        (response: boolean) => {
          this.authService.isLoggedIn = response;
          this.isLoggedIn = this.authService.isLoggedIn;
          if(this.isLoggedIn === false){
            this.router.navigate(['/signin'])
          }
        },
        (error) => {
          console.log(error);
          return false;
        }
      );
  }
}
