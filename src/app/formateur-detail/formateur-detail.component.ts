import { Component, OnInit, Input } from '@angular/core';
import { Formateur } from '../entities/formateur';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormateurService } from '../_services/formateur.service';
import { OrganismeService } from '../_services/organisme.service';
import { Organisme } from '../entities/organisme';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-formateur-detail',
  templateUrl: './formateur-detail.component.html',
  styleUrls: ['./formateur-detail.component.css']
})
export class FormateurDetailComponent implements OnInit {

  @Input() formateur? : Formateur 
  organismes? : Organisme[] 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private formateurService : FormateurService,
    private formBuilder : FormBuilder,
    private organismeService : OrganismeService
  ) { }

  formateurForm = this.formBuilder.group(
    {
      nom : this.formateur?.nom,
      prenom : this.formateur?.prenom, 
      email : this.formateur?.email,
      tel : this.formateur?.tel,
      type : this.formateur?.type,
      organisme : this.formateur?.organisme
    }
  ) ;
  ngOnInit(): void {
    this.getFormateur(); 
    this.getOrganismes();
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getFormateur() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formateurService.getFormateur(id).subscribe(formateur => this.formateur = formateur); 
  }

  addFormateur(
    nom: string,prenom : string,
    email : string,tel : string,
    type : string
  ) : void 
  {
    let nFormateur: Formateur = new Formateur(nom,prenom,email,tel,type);
    this.formateurService.addFormateur(nFormateur)
    .subscribe(() => this.goBack()) ; 
  }



  saveFormateur(): void 
  {
    if(this.formateur)
    {
      this.formateurService.updateFormateur(this.formateur).subscribe(
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


}
