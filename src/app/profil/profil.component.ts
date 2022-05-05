import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Profil } from '../entities/profil';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfilService } from '../_services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(
    private profilService : ProfilService,
    private token : TokenStorageService ) { }

  profils? : Profil[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
    if (this.adminPermission ) {
      this.getProfils() };
  }

  getProfils() : void 
  {
    this.profilService.getProfils().subscribe(
      (response : Profil[]) => {
        this.profils = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProfil(id : number): void{
    this.profilService.deleteProfil(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProfils();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }      
    );
  }

  public permissions(): boolean 
  {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }



}