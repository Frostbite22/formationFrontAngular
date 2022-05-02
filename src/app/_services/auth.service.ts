import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8090/auth/' ;
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  
  login (login : string , password: string): Observable<any>
  {
    return this.http.post(AUTH_API+'signin',{
      login,password
    },httpOptions)
  }

  register (login : string, password : string) : Observable<any>
  {
    return this.http.post(AUTH_API+'signup',{
      login,password
    },httpOptions)
  }
}
