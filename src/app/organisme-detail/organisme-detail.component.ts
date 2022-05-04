import { Component, OnInit, Input } from '@angular/core';
import { Organisme } from '../entities/organisme';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { OrganismeService } from '../_services/organisme.service';


@Component({
  selector: 'app-organisme-detail',
  templateUrl: './organisme-detail.component.html',
  styleUrls: ['./organisme-detail.component.css']
})
export class OrganismeDetailComponent implements OnInit {

  @Input() organisme? : Organisme 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private organismeService : OrganismeService,
    private formBuilder : FormBuilder
  ) { }

  organismeForm = this.formBuilder.group(
    {
      id : this.organisme?.id,
      libelle : this.organisme?.libelle, 

    }
  ) ;
  ngOnInit(): void {
    this.getOrganisme(); 
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getOrganisme() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.organismeService.getOrganisme(id).subscribe(organisme => this.organisme = organisme); 
  }

  addOrganisme(libelle :string) : void 
  {
    let nOrganisme: Organisme = new Organisme(libelle);

    this.organismeService.addOrganisme(nOrganisme)
    .subscribe(() => this.goBack()) ; 
  }



  saveOrganisme(): void 
  {
    if(this.organisme)
    {
      this.organismeService.updateOrganisme(this.organisme).subscribe(
        () => this.goBack()
      );
    }
  }

}
