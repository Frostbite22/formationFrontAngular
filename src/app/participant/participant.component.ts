
import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../_services/participant.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Participant } from '../entities/participant';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {


  constructor(
    private participantService : ParticipantService,
    private token : TokenStorageService ) { }

  participants? : Participant[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.getParticipants() ;
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
  }

  getParticipants() : void 
  {
    this.participantService.getParticipants().subscribe(
      (response : Participant[]) => {
        this.participants = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteParticipant(id : number): void{
    this.participantService.deleteParticipant(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getParticipants();
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

