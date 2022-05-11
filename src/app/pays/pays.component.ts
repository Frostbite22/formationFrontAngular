import { Component, OnInit, ViewChild } from '@angular/core';
import { Pays } from '../entities/pays';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { PaysService } from '../_services/pays.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  constructor(
    private paysService : PaysService,
    private token : TokenStorageService ) { }

  lesPays? : Pays[] ;
  currentUser : any ;
  userPermission : boolean = false ;
  dataSource!: MatTableDataSource<Pays>;
  displayedColumns: string[] = ['id', 'nom','update','delete'];
  displayedColumnsData: string[] = ['id', 'nom','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userPermission = this.permissions();
    if (this.userPermission ) {
      this.getLesPays() };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  getLesPays() : void
  {
    this.paysService.getLesPays().subscribe(
      (response : Pays[]) => {
        this.lesPays = response ;
        this.dataSource = new MatTableDataSource(this.lesPays);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deletePays(id : number): void{
    this.paysService.deletePays(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getLesPays();
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
