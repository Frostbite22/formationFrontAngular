import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Session } from '../entities/session';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(
    private sessionService : SessionService,
    private token : TokenStorageService ) { }

  sessions? : Session[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.getSessions() ;
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
  }

  getSessions() : void 
  {
    this.sessionService.getSessions().subscribe(
      (response : Session[]) => {
        this.sessions = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteSession(id : number): void{
    this.sessionService.deleteSession(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSessions();
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

  /*
  this.sessions = response.filter(session => {
    session.participants?.forEach(participant => 
      participant.id == session.id)
  })*/



}

