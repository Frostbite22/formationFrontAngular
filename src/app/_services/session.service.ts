import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../entities/session';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http : HttpClient
  ) { }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(API_URL +'/session',httpOptions);
  }

  addSession(session : Session) : Observable<Session> 
  {
    return this.http.post<Session>(API_URL+'/session',session); 
  }

  getSession(id : number) : Observable<Session> 
  {
    return this.http.get<Session>(API_URL+`/session/${id}`,httpOptions) ;
  }

  public updateSession(session : Session) : Observable<Session> 
  {
    return this.http.put<Session>(API_URL+'/session',session); 
  }

  public deleteSession( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/session/${id}`); 
  }

}
