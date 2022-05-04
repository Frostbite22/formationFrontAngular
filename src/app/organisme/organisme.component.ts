import { Component, OnInit } from '@angular/core';
import { OrganismeService } from '../_services/organisme.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Organisme } from '../entities/organisme';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.css']
})
export class OrganismeComponent implements OnInit {

  constructor(
    private organismeService : OrganismeService,
    private token : TokenStorageService ) { }

  organismes? : Organisme[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
    if (this.adminPermission ) {
      this.getOrganismes() };
  }

  getOrganismes() : void 
  {
    this.organismeService.getOrganismes().subscribe(
      (response : Organisme[]) => {
        this.organismes = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteOrganisme(id : number): void{
    this.organismeService.deleteOrganisme(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrganismes();
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