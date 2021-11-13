import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { LoginComponent } from './components/login/login.component';
import { MusicianDetailComponent } from './components/musician-detail/musician-detail.component';
import { MusiciansComponent } from './components/musicians/musicians.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },
  { path: 'musicians', component:  MusiciansComponent },
  { path: 'musician/:id', component:  MusicianDetailComponent },
  { path: 'genres', component:  GenresComponent },
  { path: '', component: MusiciansComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
