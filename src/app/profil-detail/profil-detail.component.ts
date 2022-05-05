import { Component, OnInit, Input } from '@angular/core';
import { Profil } from '../entities/profil';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ProfilService } from '../_services/profil.service';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css']
})
export class ProfilDetailComponent implements OnInit {

  @Input() profil? : Profil 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private profilService : ProfilService,
    private formBuilder : FormBuilder
  ) { }

  organismeForm = this.formBuilder.group(
    {
      id : this.profil?.id,
      libelle : this.profil?.libelle, 

    }
  ) ;
  ngOnInit(): void {
    this.getProfil(); 
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getProfil() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.profilService.getProfil(id).subscribe(profil => this.profil = profil); 
  }

  addProfil(libelle :string) : void 
  {
    let nProfil: Profil = new Profil(libelle);

    this.profilService.addProfil(nProfil)
    .subscribe(() => this.goBack()) ; 
  }



  saveProfil(): void 
  {
    if(this.profil)
    {
      this.profilService.updateProfil(this.profil).subscribe(
        () => this.goBack()
      );
    }
  }

}
