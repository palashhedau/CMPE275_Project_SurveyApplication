import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './landing/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthUnGuardService implements  CanActivate{
  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    console.log("Suarez " + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn === true) {
          this.router.navigate(['/survey']);
          return false;
        } else {
          return true;
        }
    }
}
