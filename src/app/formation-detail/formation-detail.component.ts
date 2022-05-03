import { Component, OnInit, Input } from '@angular/core';
import { Formation } from '../entities/formation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormationService } from '../_services/formation.service';
import { DomaineService } from '../_services/domaine.service';
import { Domaine } from '../entities/domaine';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {

  @Input() formation? : Formation 
  domaines? : Domaine[] 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private formationService : FormationService,
    private formBuilder : FormBuilder,
    private domaineService : DomaineService
  ) { }

  formationForm = this.formBuilder.group(
    {
      titre : this.formation?.titre,
      annee : this.formation?.annee, 
      duree : this.formation?.duree,
      nb_session : this.formation?.nb_session,
      budget :this.formation?.budget,
      type : this.formation?.type,
      domaine : this.formation?.domaine
    }
  ) ;
  ngOnInit(): void {
    this.getFormation(); 
    this.getDomaines();
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getFormation() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormation(id).subscribe(formation => this.formation = formation); 
  }

  addFormation(titre :string) : void 
  {
    let nFormation: Formation = new Formation(titre);

    this.formationService.addFormation(nFormation)
    .subscribe(() => this.goBack()) ; 
  }



  saveFormation(): void 
  {
    if(this.formation)
    {
      this.formationService.updateFormation(this.formation).subscribe(
        () => this.goBack()
      );
    }
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


}
