import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Profil } from '../entities/profil';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfilService } from '../_services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(
    private profilService : ProfilService,
    private token : TokenStorageService ) { }

  profils? : Profil[] ;
  currentUser : any ;
  userPermission : boolean = false ;
  dataSource!: MatTableDataSource<Profil>;
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
      this.getProfils() };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  getProfils() : void
  {
    this.profilService.getProfils().subscribe(
      (response : Profil[]) => {
        this.profils = response ;
        this.dataSource = new MatTableDataSource(this.profils);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProfil(id : number): void{
    this.profilService.deleteProfil(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProfils();
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
