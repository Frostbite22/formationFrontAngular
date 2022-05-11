import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganismeService } from '../_services/organisme.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Organisme } from '../entities/organisme';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.css']
})
export class OrganismeComponent implements OnInit {

  constructor(
    private organismeService : OrganismeService,
    private token : TokenStorageService ) { }

  organismes? : Organisme[] ;
  currentUser : any ;
  userPermission : boolean = false ;
  dataSource!: MatTableDataSource<Organisme>;
  displayedColumns: string[] = ['id', 'libelle','update','delete'];
  displayedColumnsData: string[] = ['id', 'libelle','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userPermission = this.permissions();
    if (this.userPermission ) {
      this.getOrganismes() };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getOrganismes() : void
  {
    this.organismeService.getOrganismes().subscribe(
      (response : Organisme[]) => {
        this.organismes = response ;
        this.dataSource = new MatTableDataSource(this.organismes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteOrganisme(id : number): void{
    this.organismeService.deleteOrganisme(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrganismes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public permissions(): boolean
  {
    return this.currentUser.roles.includes("ROLE_USER");
  }

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
