import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../entities/participant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ParticipantService } from '../_services/participant.service';
import { OrganismeService } from '../_services/organisme.service';
import { Organisme } from '../entities/organisme';
import { HttpErrorResponse } from '@angular/common/http';
import { PaysService } from '../_services/pays.service';
import { ProfilService } from '../_services/profil.service';
import { Pays } from '../entities/pays';
import { Profil } from '../entities/profil';
import { Session } from '../entities/session';
import { Formateur } from '../entities/formateur';
import { Formation } from '../entities/formation';
import { SessionService } from '../_services/session.service';
import { FormateurService } from '../_services/formateur.service';
import { FormationService } from '../_services/formation.service';


@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {


  @Input() session? : Session 
  organismes? : Organisme[] ;
  formateurs? : Formateur[];
  formations? : Formation[];
 // participants? : Participant[] ; 
 // numParticipants? : number = 0 ; 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private participantService : ParticipantService,
    private formBuilder : FormBuilder,
    private organismeService : OrganismeService,
    private formateurService : FormateurService, 
    private sessionService : SessionService,
    private formationService : FormationService
  ) { }

  sessionForm = this.formBuilder.group(
    {
      date_debut : this.session?.date_debut,
      date_fin : this.session?.date_fin, 
      lieu : this.session?.lieu,
      formateur : this.session?.formateur,
      formation : this.session?.formation,
      organisme : this.session?.organisme 
    }
  ) ;
  ngOnInit(): void {
    this.getSession();
  //  this.getPraticipants(); 
    this.getOrganismes();
    this.getFormateurs(); 
    this.getFormations();
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getSession() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sessionService.getSession(id).subscribe(session => this.session = session); 
  }

  addSession(
    
    lieu : string
  ) : void 
  {
    let nSession: Session = new Session(lieu);
    this.sessionService.addSession(nSession)
    .subscribe(() => this.goBack()) ; 
  }


  saveSession(): void 
  {
    if(this.session)
    {
      this.sessionService.updateSession(this.session).subscribe(
        () => this.goBack()
      );
    }
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

/*  getPraticipants() : void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sessionService.getSession(id).subscribe(session => this.numParticipants = session.participants?.length);
  }*/

}
