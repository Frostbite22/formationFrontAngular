import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders } from './_helpers/auth.interceptor';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { FormationComponent } from './formation/formation.component';
import { DomaineComponent } from './domaine/domaine.component';
import { DomaineDetailComponent } from './domaine-detail/domaine-detail.component';
import { FormateurComponent } from './formateur/formateur.component';
import { FormateurDetailComponent } from './formateur-detail/formateur-detail.component';
import { OrganismeDetailComponent } from './organisme-detail/organisme-detail.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { PaysComponent } from './pays/pays.component';
import { PaysDetailComponent } from './pays-detail/pays-detail.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilDetailComponent } from './profil-detail/profil-detail.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    FormationDetailComponent,
    FormationComponent,
    DomaineComponent,
    DomaineDetailComponent,
    FormateurComponent,
    FormateurDetailComponent,
    OrganismeDetailComponent,
    OrganismeComponent,
    PaysComponent,
    PaysDetailComponent,
    ProfilComponent,
    ProfilDetailComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
