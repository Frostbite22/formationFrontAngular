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
import { SessionService } from '../_services/session.service';
import { Session } from '../entities/session';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';



@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.css']
})
export class ParticipantDetailComponent implements OnInit {

  @Input() participant? : Participant 
   session? : Session 
   sessionId?: number
  organismes? : Organisme[] ;
  lesPays? : Pays[];
  profils? : Profil[] ; 
  sessions? : Session[];
  allSessions?: Session[];
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private ParticipantService : ParticipantService,
    private formBuilder : FormBuilder,
    private organismeService : OrganismeService,
    private paysService : PaysService, 
    private profilService : ProfilService,
    private sessionService : SessionService,
    @Inject(DOCUMENT) document: Document
  ) { }

  participantForm = this.formBuilder.group(
    {
      nom : this.participant?.nom,
      prenom : this.participant?.prenom, 
      email : this.participant?.email,
      tel : this.participant?.tel,
      pays : this.participant?.pays,
      organisme : this.participant?.organisme,
      profil : this.participant?.profil 
    }
  ) ;
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
    this.getParticipant(); 
    this.getOrganismes();
    this.getLesPays(); 
    this.getProfils();
    this.getSessionsPerParticipant();
  
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getParticipant() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ParticipantService.getParticipant(id).subscribe(participant => this.participant = participant); 
  }

  addParticipant(
    nom: string,prenom : string,
    email : string,tel : string,
  ) : void 
  {
    let nParticipant: Participant = new Participant(nom,prenom,email,tel);
    this.ParticipantService.addParticipant(nParticipant)
    .subscribe(() => this.goBack()) ; 
  }


  saveParticipant(): void 
  {
    if(this.participant)
    {
      this.ParticipantService.updateParticipant(this.participant).subscribe(
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

  getSessionsPerParticipant(): void 
  {
    const participant_id = Number(this.route.snapshot.paramMap.get('id'));

    this.sessionService.getSessions().subscribe(
      (response: Session[]) => {
        let aux : Session[] = []; 
        for (let session of response)
        {
          session.participants?.forEach(participant => {
            if(participant.id ==participant_id)
            {
              aux.push(session); 
            }
          })
        }
        this.sessions = aux ; 
    })
  }

  show(): void 
  {

    document.getElementById("sessionsToAdd")!.hidden = false ; 
    document.getElementById("saveAdded")!.hidden = false ; 

    this.getSessions();

  }

  saveSession() : void 
  {
    if(this.sessionId)
    {
    
     this.session?.participants?.push(this.participant!);
     console.log(this.session)
     this.sessionService.updateSession(this.session!).subscribe(
      () => this.goBack());

    }

  }

  getSessions() : void 
  {
    this.sessionService.getSessions().subscribe(
      (response : Session[]) => {
        this.allSessions = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOptionsSelected(value : string) : void 
  {
     this.sessionId = parseInt(value) ;
     this.sessionService.getSession(this.sessionId).subscribe(session => this.session = session);    

  }
  
  
}
