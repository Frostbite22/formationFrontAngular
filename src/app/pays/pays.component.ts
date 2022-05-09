import { Component, OnInit } from '@angular/core';
import { Pays } from '../entities/pays';
import { TokenStorageService } from '../_services/token-storage.service';

import { HttpErrorResponse } from '@angular/common/http';
import { PaysService } from '../_services/pays.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  constructor(
    private paysService : PaysService,
    private token : TokenStorageService ) { }

  lesPays? : Pays[] ;
  currentUser : any ;
  userPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
    this.userPermission = this.permissions();
    if (this.userPermission ) {
      this.getLesPays() };
  }

  getLesPays() : void 
  {
    this.paysService.getLesPays().subscribe(
      (response : Pays[]) => {
        this.lesPays = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deletePays(id : number): void{
    this.paysService.deletePays(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getLesPays();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }      
    );
  }

  public permissions(): boolean 
  {
    return this.currentUser.roles.includes("ROLE_USER");
  }



}