import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Formation } from '../entities/formation';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService : UserService) { }

  formations? : Formation[] ;
  
  ngOnInit(): void {
    this.getFormations() ;
  }

  getFormations() : void 
  {
    this.userService.getFormations().subscribe(
      (response : Formation[]) => {
        this.formations = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



}
