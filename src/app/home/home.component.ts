import { Component, OnInit } from '@angular/core';
import { FormationService } from '../_services/formation.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Formation } from '../entities/formation';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formationService : FormationService,
    private token : TokenStorageService ) { }

  formations? : Formation[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.getFormations() ;
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
    console.log(this.adminPermission);
  }

  getFormations() : void 
  {
    this.formationService.getFormations().subscribe(
      (response : Formation[]) => {
        this.formations = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteFormation(id : number): void{
    this.formationService.deleteFormation(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormations();
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
