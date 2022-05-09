import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Role } from '../entities/role';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../_services/role.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {


  constructor(
    private roleService : RoleService,
    private token : TokenStorageService ) { }

  roles? : Role[] ;
  currentUser : any ;
  adminPermission : boolean = false ; 
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser(); 
    this.adminPermission = this.permissions();
    if (this.adminPermission ) {
      this.getRoles() };
  }

  getRoles() : void 
  {
    this.roleService.getRoles().subscribe(
      (response : Role[]) => {
        this.roles = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteRole(id : number): void{
    this.roleService.deleteRole(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }      
    );
  }


  public permissions(): boolean 
  {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }



}