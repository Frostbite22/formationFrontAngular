import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantService } from '../_services/participant.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Participant } from '../entities/participant';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {


  constructor(
    private participantService : ParticipantService,
    private token : TokenStorageService ) { }

  participants? : Participant[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Participant>;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email','tel','pays','organisme','profil','update','delete'];
  displayedColumnsData: string[] = ['id', 'nom', 'prenom', 'email','tel','pays','organisme','profil','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getParticipants() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getParticipants() : void
  {
    this.participantService.getParticipants().subscribe(
      (response : Participant[]) => {
        this.participants = response;
        this.dataSource = new MatTableDataSource(this.participants);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteParticipant(id : number): void{
    this.participantService.deleteParticipant(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getParticipants();
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

