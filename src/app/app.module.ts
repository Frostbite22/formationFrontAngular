import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
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
import { ParticipantComponent } from './participant/participant.component';
import { ParticipantDetailComponent } from './participant-detail/participant-detail.component';
import { SessionComponent } from './session/session.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
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
    ProfilDetailComponent,
    ParticipantComponent,
    ParticipantDetailComponent,
    SessionComponent,
    SessionDetailComponent,
    UserComponent,
    UserDetailComponent,
    RoleComponent,
    RoleDetailComponent
    
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
