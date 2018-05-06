import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ResponseParams} from './response.model';


@Injectable()
export class AuthService{
  public isLoggedIn = false;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<ResponseParams>('http://localhost:8081/signin',
      {email: email, password: password},
      { withCredentials: true });
  }

  setLoggedIn(){
    this.isLoggedIn = true;
  }

  register(email: string, password: string, category: string ){
    return this.http.post<ResponseParams>('http://localhost:8081/signup',
      {email: email, password: password, type: category}, );
  }

  activate(email: string, code: string){
    return this.http.post<ResponseParams>('http://localhost:8081/activate-account',{email: email, password: code});
  }

  checkSession(): Promise<any> {
    return this.http
      .get('http://localhost:8081/check-session', {withCredentials: true})
      .toPromise()
      .then((data: any) => {
        this.isLoggedIn = data;
      })
      .catch((err: any) => {
        this.isLoggedIn = false;
      });
  }

  logout() {
    const _this = this;
    this.http.get('http://localhost:8081/logout',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true}).subscribe(
      (response: boolean) => {
        _this.isLoggedIn = response;
      },
      (error) => {
          console.log(error);
      }
    );
  }
}
