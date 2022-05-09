import { Component, OnInit, Input } from '@angular/core';
import { Role } from '../entities/role';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {


  @Input() role? : Role 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private roleService : RoleService,
    private formBuilder : FormBuilder
  ) { }

  roleForm = this.formBuilder.group(
    {
      id : this.role?.id,
      nom : this.role?.nom, 

    }
  ) ;
  ngOnInit(): void {
    this.getRole(); 
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getRole() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roleService.getRole(id).subscribe(role => this.role = role); 
  }

  addRole(nom :string) : void 
  {
    let nRole: Role = new Role(nom);

    this.roleService.addRole(nRole)
    .subscribe(() => this.goBack()) ; 
  }



  saveRole(): void 
  {
    if(this.role)
    {
      this.roleService.updateRole(this.role).subscribe(
        () => this.goBack()
      );
    }
  }

}
