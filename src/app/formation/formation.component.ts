import { Component, OnInit, ViewChild } from '@angular/core';
import { FormationService } from '../_services/formation.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Formation } from '../entities/formation';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  constructor(
    private formationService : FormationService,
    private token : TokenStorageService ) { }

  formations? : Formation[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Formation>;
  displayedColumns: string[] = ['id', 'titre', 'annee', 'budget','nb_session','duree','type','domaine','update','delete'];
  displayedColumnsData: string[] = ['id', 'titre', 'annee', 'budget','nb_session','duree','type','domaine','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getFormations() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getFormations() : void
  {
    this.formationService.getFormations().subscribe(
      (response : Formation[]) => {
        this.formations = response;
        this.dataSource = new MatTableDataSource(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteFormation(id : number): void{
    this.formationService.deleteFormation(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormations();
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
