import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ResponseParams} from './response.model';



@Injectable()
export class AuthService{
  public isLoggedIn = false;
  public email : string;

  public url = 'http://54.241.144.193:8081/' ;
  //public url = 'http://localhost:8081/' ;

  constructor(private http: HttpClient,
              ) {}

  login(email: string, password: string) {
    console.log(this.url + 'signin');
    return this.http.post<ResponseParams>(this.url + 'signin',
      {email: email, password: password},
      { withCredentials: true });
  }

  setLoggedIn(){
    this.isLoggedIn = true;
  }

  register(email: string, password: string, category: string ){
    return this.http.post<ResponseParams>(this.url + 'signup',
      {email: email, password: password, type: category}, );
  }

  activate(email: string, code: string){
    return this.http.post<ResponseParams>(this.url + 'account-verification',
      {email: email, password: code});
  }

  checkSession(): Promise<any> {
    return this.http
      .get(this.url + 'check-session', {withCredentials: true})
      .toPromise()
      .then((data: {auth : boolean, email : string}) => {
        this.isLoggedIn = data.auth;
        this.email = data.email;
      })
      .catch((err: any) => {
        this.isLoggedIn = false;
      });
  }

  logout() {
    return this.http.get(this.url + 'logout',
      {headers: new HttpHeaders().append('Content-Type', 'application/json'),
        withCredentials: true});
  }
}
