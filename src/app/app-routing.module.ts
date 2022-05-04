import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { DomaineDetailComponent } from './domaine-detail/domaine-detail.component';
import { OrganismeDetailComponent } from './organisme-detail/organisme-detail.component';
import { FormateurComponent } from './formateur/formateur.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'formation/detail', component: FormationDetailComponent },
  { path: 'formation/detail/:id', component: FormationDetailComponent },
  { path: 'domaine/detail', component: DomaineDetailComponent },
  { path: 'domaine/detail/:id', component: DomaineDetailComponent },
  { path: 'organisme/detail', component: OrganismeDetailComponent },
  { path: 'organisme/detail/:id', component: OrganismeDetailComponent },
  { path: 'formateurs', component: FormateurComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
