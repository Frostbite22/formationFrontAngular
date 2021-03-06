import { Component, OnInit, ViewChild } from '@angular/core';
import { DomaineService } from '../_services/domaine.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Domaine } from '../entities/domaine';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit {

  constructor(
    private domaineService : DomaineService,
    private token : TokenStorageService ) { }

  domaines? : Domaine[] ;
  currentUser : any ;
  userPermission : boolean = false ;
  dataSource!: MatTableDataSource<Domaine>;
  displayedColumns: string[] = ['id', 'libelle','update','delete'];
  displayedColumnsData: string[] = ['id', 'libellle','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userPermission = this.permissions();
    if (this.userPermission ) {
      this.getDomaines() };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  getDomaines() : void
  {
    this.domaineService.getDomaines().subscribe(
      (response : Domaine[]) => {
        this.domaines = response;
        this.dataSource = new MatTableDataSource(this.domaines);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteDomaine(id : number): void{
    this.domaineService.deleteDomaine(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getDomaines();
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
