import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Profil } from '../entities/profil';


const API_URL = 'http://localhost:8090';
const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json'})
}; 
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private http : HttpClient
  ) { }

  getProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(API_URL +'/profil',httpOptions)
  }

  addProfil(domaine : Profil) : Observable<Profil> 
  {
    return this.http.post<Profil>(API_URL+'/profil',domaine); 
  }

  getProfil(id : number) : Observable<Profil> 
  {
    return this.http.get<Profil>(API_URL+`/profil/${id}`,httpOptions) ;
  }

  public updateProfil(domaine : Profil) : Observable<Profil> 
  {
    return this.http.put<Profil>(API_URL+'/profil',domaine); 
  }

  public deleteProfil( id : number) : Observable<void> 
  {
    return this.http.delete<void>(API_URL+`/profil/${id}`); 
  }
}
