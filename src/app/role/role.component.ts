import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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
  dataSource!: MatTableDataSource<Role>;
  displayedColumns: string[] = ['id', 'nom','update','delete'];
  displayedColumnsData: string[] = ['id', 'nom','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    if (this.adminPermission ) {
      this.getRoles() };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getRoles() : void
  {
    this.roleService.getRoles().subscribe(
      (response : Role[]) => {
        this.roles = response;
        this.dataSource = new MatTableDataSource(this.roles);
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

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
