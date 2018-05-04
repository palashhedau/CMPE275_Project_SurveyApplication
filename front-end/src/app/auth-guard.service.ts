import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './landing/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuardService implements  CanActivate{
  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        if (this.authService.isLoggedIn === true) {
          console.log("Palash 1 ");
          return true;
        } else {
          console.log("Palash 2 ");
          this.router.navigate(['/signin']);
          return false;
        }
    }
}
