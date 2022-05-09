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
import { TokenStorageService } from '../_services/token-storage.service';
import { Role } from '../entities/role';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {



  @Input() user? : User ;
  roles? : Role[];
  myRoles?: Role[] ; 
  currentUser : any ;
  chosenRole? : Role ;
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private userService : UserService,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private token : TokenStorageService
  ) { }

  userForm = this.formBuilder.group(
    {
      login : this.user?.login,
      password : this.user?.password
    }
  ) ;
  ngOnInit(): void {
    this.getUser(); 
    this.myRoles = this.user?.roles
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

  getRoles() : void 
  {
   this.currentUser = this.token.getUser();
   this.roles = this.currentUser.roles;
  }


  show(): void 
  {

    document.getElementById("sessionsToAdd")!.hidden = false ; 
    document.getElementById("saveAdded")!.hidden = false ; 

    this.getRoles();

  }

  saveRole() : void 
  {
    if(this.chosenRole)
    {
     this.user?.roles?.push(this.chosenRole!);
     this.userService.updateUser(this.user!).subscribe(
      () => this.goBack());

    }

  }

  onOptionsSelected(value : string) : void 
  {
    console.log(value)
      this.chosenRole = new Role(value);
  }
  

}
