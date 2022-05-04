import { Injectable } from '@angular/core';
import { Organisme } from '../entities/organisme';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 


@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  constructor(
    private http : HttpClient
  ) { }


    getOrganismes(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>(API_URL +'/organisme',httpOptions)
  }

  addOrganisme(organisme : Organisme) : Observable<Organisme> 
  {
    return this.http.post<Organisme>(API_URL+'/organisme',organisme); 
  }

  getOrganisme(id : number) : Observable<Organisme> 
  {
    return this.http.get<Organisme>(API_URL+`/organisme/${id}`,httpOptions) ;
  }

  public updateOrganisme(organisme : Organisme) : Observable<Organisme> 
  {
    return this.http.put<Organisme>(API_URL+'/organisme',organisme); 
  }

  public deleteOrganisme( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/organisme/${id}`); 
  }
}
