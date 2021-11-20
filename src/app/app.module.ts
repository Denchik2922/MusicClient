import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusiciansComponent } from './components/musicians/musicians.component';
import { GenresComponent } from './components/genres/genres.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MusicianDetailComponent } from './components/musician-detail/musician-detail.component';
import { JwtModule } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MusicianAddComponent } from './components/musician-add/musician-add.component';
import { MusicianEditComponent } from './components/musician-edit/musician-edit.component';
import { AdminGuard } from './guards/admin.guard';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


@NgModule({
  declarations: [
    AppComponent,
    MusiciansComponent,
    GenresComponent,
    HeaderComponent,
    MusicianDetailComponent,
    LoginComponent,
    RegisterComponent,
    MusicianAddComponent,
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
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
