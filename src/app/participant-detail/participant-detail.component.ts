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

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.css']
})
export class ParticipantDetailComponent implements OnInit {

  @Input() participant? : Participant 
  organismes? : Organisme[] ;
  lesPays? : Pays[];
  profils? : Profil[] ; 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private ParticipantService : ParticipantService,
    private formBuilder : FormBuilder,
    private organismeService : OrganismeService,
    private paysService : PaysService, 
    private profilService : ProfilService
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
  ngOnInit(): void {
    this.getParticipant(); 
    this.getOrganismes();
    this.getLesPays(); 
    this.getProfils();
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


}
