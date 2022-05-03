import { Component, OnInit, Input } from '@angular/core';
import { Formation } from '../entities/formation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormationService } from '../_services/formation.service';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {

  @Input() formation? : Formation 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private formationService : FormationService,
    private formBuilder : FormBuilder
  ) { }

  formationForm = this.formBuilder.group(
    {
      titre : this.formation?.titre,
      annee : this.formation?.annee, 
      duree : this.formation?.duree,
      nb_session : this.formation?.nb_session,
      budget :this.formation?.budget,
      id : this.formation?.id,
      type : this.formation?.type,
      domaine_id : this.formation?.domaine_id
    }
  ) ;
  ngOnInit(): void {
    this.getFormation(); 
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

}
