import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../entities/participant';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private http : HttpClient
  ) { }

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(API_URL +'/participant',httpOptions);
  }

  addParticipant(participant : Participant) : Observable<Participant> 
  {
    return this.http.post<Participant>(API_URL+'/participant',participant); 
  }

  getParticipant(id : number) : Observable<Participant> 
  {
    return this.http.get<Participant>(API_URL+`/participant/${id}`,httpOptions) ;
  }

  public updateParticipant(participant : Participant) : Observable<Participant> 
  {
    return this.http.put<Participant>(API_URL+'/participant',participant); 
  }

  public deleteParticipant( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/participant/${id}`); 
  }

}
