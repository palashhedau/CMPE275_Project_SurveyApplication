import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResponseParams} from './response.model';


@Injectable()
export class AuthService{
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log(email + " " + password)
    return this.http.post<ResponseParams>('http://localhost:8081/signin',{email: email, password: password});
  }

  register(email: string, password: string, category: string ){
    return this.http.post<ResponseParams>('http://localhost:8081/signup',{email: email, password: password, type: category});
  }

  activate(email: string, code: string){
    return this.http.post<ResponseParams>('http://localhost:8081/activate-account',{email: email, password: code});
  }
}
