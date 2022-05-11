import { Component, OnInit, ViewChild } from '@angular/core';
import { FormateurService } from '../_services/formateur.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Formateur } from '../entities/formateur';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})


export class FormateurComponent implements OnInit {

  constructor(
    private formateurService : FormateurService,
    private token : TokenStorageService ) { }

  formateurs? : Formateur[] ;
  currentUser : any ;
  adminPermission : boolean = false ;
  dataSource!: MatTableDataSource<Formateur>;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email','tel','type','organisme','update','delete'];
  displayedColumnsData: string[] = ['id', 'nom', 'prenom', 'email','tel','type','organisme','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getFormateurs() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getFormateurs() : void
  {
    this.formateurService.getFormateurs().subscribe(
      (response : Formateur[]) => {
        this.formateurs = response;
        this.dataSource = new MatTableDataSource(this.formateurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteFormateur(id : number): void{
    this.formateurService.deleteFormateur(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormateurs();
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
