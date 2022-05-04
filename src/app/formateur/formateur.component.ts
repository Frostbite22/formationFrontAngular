import { Component, OnInit } from '@angular/core';
import { FormateurService } from '../_services/formateur.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Formateur } from '../entities/formateur';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})


export class FormateurComponent implements OnInit {

  constructor(
    private formateurService : FormateurService,
    private token : TokenStorageService ) { }

  formateurs? : Formateur[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.getFormateurs() ;
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
  }

  getFormateurs() : void 
  {
    this.formateurService.getFormateurs().subscribe(
      (response : Formateur[]) => {
        this.formateurs = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteFormateur(id : number): void{
    this.formateurService.deleteFormateur(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormateurs();
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
