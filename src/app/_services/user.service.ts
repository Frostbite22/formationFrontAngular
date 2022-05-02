import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../entities/formation';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(API_URL +'/formation',httpOptions);
  }

}
