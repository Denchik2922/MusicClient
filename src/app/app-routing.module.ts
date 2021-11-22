import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MusiciansComponent } from './components/musician/musicians/musicians.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },  
  { path: 'musician', loadChildren: () => import("./modules/musician/musician.module").then(m => m.MusicianModule) },
  { path: 'group', loadChildren: () => import("./modules/group/group.module").then(m => m.GroupModule) },
  { path: 'album', loadChildren: () => import("./modules/music-album/music-album.module").then(m => m.MusicAlbumModule) },
  { path: 'genre', loadChildren: () => import("./modules/genre/genre.module").then(m => m.GenreModule) },
  { path: 'song', loadChildren: () => import("./modules/song/song.module").then(m => m.SongModule) },
  { path: 'instrument', loadChildren: () => import("./modules/music-instrument/music-instrument.module").then(m => m.MusicInstrumentModule) },
  { path: '', component: MusiciansComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
