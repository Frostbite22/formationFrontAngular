import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pays } from '../entities/pays';


const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 


@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(
    private http : HttpClient
  ) { }


    getLesPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(API_URL +'/pays',httpOptions)
  }

  addPays(organisme : Pays) : Observable<Pays> 
  {
    return this.http.post<Pays>(API_URL+'/pays',organisme); 
  }

  getPays(id : number) : Observable<Pays> 
  {
    return this.http.get<Pays>(API_URL+`/pays/${id}`,httpOptions) ;
  }

  public updatePays(pays : Pays) : Observable<Pays> 
  {
    return this.http.put<Pays>(API_URL+'/pays',pays); 
  }

  public deletePays( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/pays/${id}`); 
  }
}
