import { Component, OnInit, Input } from '@angular/core';
import { Pays } from '../entities/pays';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { PaysService } from '../_services/pays.service';


@Component({
  selector: 'app-pays-detail',
  templateUrl: './pays-detail.component.html',
  styleUrls: ['./pays-detail.component.css']
})
export class PaysDetailComponent implements OnInit {
  @Input() pays? : Pays 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private paysService : PaysService,
    private formBuilder : FormBuilder
  ) { }

  paysForm = this.formBuilder.group(
    {
      id : this.pays?.id,
      nom : this.pays?.nom, 

    }
  ) ;
  ngOnInit(): void {
    this.getPays(); 
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getPays() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.paysService.getPays(id).subscribe(pays => this.pays = pays); 
  }

  addPays(nom :string) : void 
  {
    let nPays: Pays = new Pays(nom);

    this.paysService.addPays(nPays)
    .subscribe(() => this.goBack()) ; 
  }



  savePays(): void 
  {
    if(this.pays)
    {
      this.paysService.updatePays(this.pays).subscribe(
        () => this.goBack()
      );
    }
  }

}