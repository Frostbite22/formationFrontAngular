import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../_services/domaine.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Domaine } from '../entities/domaine';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit {

  constructor(
    private domaineService : DomaineService,
    private token : TokenStorageService ) { }

  domaines? : Domaine[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
    if (this.adminPermission ) {
      this.getDomaines() };
  }

  getDomaines() : void 
  {
    this.domaineService.getDomaines().subscribe(
      (response : Domaine[]) => {
        this.domaines = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteDomaine(id : number): void{
    this.domaineService.deleteDomaine(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getDomaines();
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
