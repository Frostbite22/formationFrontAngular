import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Domaine } from '../entities/domaine';
import {catchError} from 'rxjs/operators'; 


const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 
@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(
    private http : HttpClient
  ) { }

  getDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(API_URL +'/domaine',httpOptions)
  }

  addDomaine(domaine : Domaine) : Observable<Domaine> 
  {
    return this.http.post<Domaine>(API_URL+'/domaine',domaine); 
  }

  getDomaine(id : number) : Observable<Domaine> 
  {
    return this.http.get<Domaine>(API_URL+`/domaine/${id}`,httpOptions) ;
  }

  public updateDomaine(domaine : Domaine) : Observable<Domaine> 
  {
    return this.http.put<Domaine>(API_URL+'/domaine',domaine); 
  }

  public deleteDomaine( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/domaine/${id}`); 
  }
}
