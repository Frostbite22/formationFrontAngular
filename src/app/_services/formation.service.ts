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
export class FormationService {

  constructor(
    private http : HttpClient
  ) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(API_URL +'/formation',httpOptions);
  }

  addFormation(formation : Formation) : Observable<Formation> 
  {
    return this.http.post<Formation>(API_URL+'/formation',formation); 
  }

  getFormation(id : number) : Observable<Formation> 
  {
    return this.http.get<Formation>(API_URL+`/formation/${id}`,httpOptions) ;
  }

  public updateFormation(formation : Formation) : Observable<Formation> 
  {
    return this.http.put<Formation>(API_URL+'/formation',formation); 
  }

  public deleteFormation( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/formation/${id}`); 
  }

}
