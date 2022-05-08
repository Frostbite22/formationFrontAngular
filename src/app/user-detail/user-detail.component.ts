import { Component, OnInit, Input } from '@angular/core';
import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { OrganismeService } from '../_services/organisme.service';
import { Organisme } from '../entities/organisme';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {



  @Input() user? : User 
  //organismes? : Organisme[] 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private userService : UserService,
    private formBuilder : FormBuilder,
    private organismeService : OrganismeService,
    private authService : AuthService
  ) { }

  userForm = this.formBuilder.group(
    {
      login : this.user?.login,
      password : this.user?.password
    }
  ) ;
  ngOnInit(): void {
    this.getUser(); 
   // this.getOrganismes();
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getUser() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => this.user = user); 
  }

  addUser(
    login: string,password : string,
  ) : void 
  {
    this.authService.register(login,password)
    .subscribe(() => this.goBack()) ; 
  }



  saveUser(): void 
  {
    if(this.user)
    {
      this.userService.updateUser(this.user).subscribe(
        () => this.goBack()
      );
    }
  }

 /* getOrganismes() : void 
  {
    this.organismeService.getOrganismes().subscribe(
      (response : Organisme[]) => {
        this.organismes = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/


}
