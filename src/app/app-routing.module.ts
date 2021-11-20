import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { LoginComponent } from './components/login/login.component';
import { MusicianAddComponent } from './components/musician-add/musician-add.component';
import { MusicianDetailComponent } from './components/musician-detail/musician-detail.component';
import { MusicianEditComponent } from './components/musician-edit/musician-edit.component';
import { MusiciansComponent } from './components/musicians/musicians.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },
  { path: 'musicians', component:  MusiciansComponent },
  { path: 'musician/add', component:  MusicianAddComponent, canActivate: [AdminGuard] },
  { path: 'musician/:id', component:  MusicianDetailComponent},
  { path: 'musician/edit/:id', component:  MusicianEditComponent, canActivate: [AdminGuard] },
  { path: 'genres', component:  GenresComponent },
  { path: '', component: MusiciansComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
