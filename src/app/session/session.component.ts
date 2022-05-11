import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Session } from '../entities/session';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(
    private sessionService : SessionService,
    private token : TokenStorageService ) { }

  sessions? : Session[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Session>;
  displayedColumns: string[] = ['id', 'date_debut', 'date_fin', 'lieu','formateur','formation','organisme','nb_participants','update','delete'];
  displayedColumnsData: string[] = ['id', 'date_debut', 'date_fin', 'lieu','formateur','formation','organisme','nb_participants','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSessions() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getSessions() : void
  {
    this.sessionService.getSessions().subscribe(
      (response : Session[]) => {
        this.sessions = response
        this.dataSource = new MatTableDataSource(this.sessions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteSession(id : number): void{
    this.sessionService.deleteSession(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSessions();
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

  /*
  this.sessions = response.filter(session => {
    session.participants?.forEach(participant =>
      participant.id == session.id)
  })*/

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

