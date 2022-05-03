import { Component, OnInit } from '@angular/core';
import { FormationService } from '../_services/formation.service';
import { Formation } from '../entities/formation';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private formationService : FormationService) { }

  formations? : Formation[] ;
  
  ngOnInit(): void {
    this.getFormations() ;
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



}
