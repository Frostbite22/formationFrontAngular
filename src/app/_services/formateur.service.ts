import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formateur } from '../entities/formateur';

const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(
    private http : HttpClient
  ) { }

  getFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(API_URL +'/formateur',httpOptions);
  }

  addFormateur(formateur : Formateur) : Observable<Formateur> 
  {
    return this.http.post<Formateur>(API_URL+'/formateur',formateur); 
  }

  getFormateur(id : number) : Observable<Formateur> 
  {
    return this.http.get<Formateur>(API_URL+`/formateur/${id}`,httpOptions) ;
  }

  public updateFormateur(formateur : Formateur) : Observable<Formateur> 
  {
    return this.http.put<Formateur>(API_URL+'/formateur',formateur); 
  }

  public deleteFormateur( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/formateur/${id}`); 
  }

}
