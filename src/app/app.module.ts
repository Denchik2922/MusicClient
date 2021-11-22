import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenresComponent } from './components/genre/genres/genres.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { GroupsComponent } from './components/group/groups/groups.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { GroupAddComponent } from './components/group/group-add/group-add.component';
import { GroupEditComponent } from './components/group/group-edit/group-edit.component';
import { MusicAlbumsComponent } from './components/musicAlbum/music-albums/music-albums.component';
import { MusicAlbumsDetailComponent } from './components/musicAlbum/music-albums-detail/music-albums-detail.component';
import { MusicAlbumsAddComponent } from './components/musicAlbum/music-albums-add/music-albums-add.component';
import { MusicAlbumsEditComponent } from './components/musicAlbum/music-albums-edit/music-albums-edit.component';
import { DatePipe } from '@angular/common';
import { GenreAddComponent } from './components/genre/genre-add/genre-add.component';
import { GenreEditComponent } from './components/genre/genre-edit/genre-edit.component';
import { SongsComponent } from './components/song/songs/songs.component';
import { SongAddComponent } from './components/song/song-add/song-add.component';
import { SongEditComponent } from './components/song/song-edit/song-edit.component';
import { MusicInstrumentsComponent } from './components/musicInstrument/music-instruments/music-instruments.component';
import { InstrumentAddComponent } from './components/musicInstrument/instrument-add/instrument-add.component';
import { InstrumentEditComponent } from './components/musicInstrument/instrument-edit/instrument-edit.component'
import { MusiciansComponent } from './components/musician/musicians/musicians.component';
import { MusicianAddComponent } from './components/musician/musician-add/musician-add.component';
import { MusicianDetailComponent } from './components/musician/musician-detail/musician-detail.component';
import { MusicianEditComponent } from './components/musician/musician-edit/musician-edit.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    GroupsComponent,
    GroupDetailComponent,
    GroupAddComponent,
    GroupEditComponent,
    MusicAlbumsComponent,
    MusicAlbumsDetailComponent,
    MusicAlbumsAddComponent,
    MusicAlbumsEditComponent,
    GenreAddComponent,
    GenreEditComponent,
    SongsComponent,
    SongAddComponent,
    SongEditComponent,
    MusicInstrumentsComponent,
    InstrumentAddComponent,
    InstrumentEditComponent,
    MusiciansComponent,
    MusicianAddComponent,
    MusicianDetailComponent,
    MusicianEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter,
        allowedDomains: ["localhost:5001"]
      }
    })
  ],
  providers: [AdminGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
