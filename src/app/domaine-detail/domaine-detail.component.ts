import { Component, OnInit, Input } from '@angular/core';
import { Domaine } from '../entities/domaine';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DomaineService } from '../_services/domaine.service';

@Component({
  selector: 'app-domaine-detail',
  templateUrl: './domaine-detail.component.html',
  styleUrls: ['./domaine-detail.component.css']
})
export class DomaineDetailComponent implements OnInit {

  @Input() domaine? : Domaine 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private domaineService : DomaineService,
    private formBuilder : FormBuilder
  ) { }

  formationForm = this.formBuilder.group(
    {
      id : this.domaine?.id,
      libelle : this.domaine?.libelle, 

    }
  ) ;
  ngOnInit(): void {
    this.getDomaine(); 
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getDomaine() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.domaineService.getDomaine(id).subscribe(domaine => this.domaine = domaine); 
  }

  addDomaine(libelle :string) : void 
  {
    let nDomaine: Domaine = new Domaine(libelle);

    this.domaineService.addDomaine(nDomaine)
    .subscribe(() => this.goBack()) ; 
  }



  saveDomaine(): void 
  {
    if(this.domaine)
    {
      this.domaineService.updateDomaine(this.domaine).subscribe(
        () => this.goBack()
      );
    }
  }

}
