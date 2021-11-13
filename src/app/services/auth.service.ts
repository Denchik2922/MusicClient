import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/tokens';

export const ACCESS_TOKEN_KEY = "music_token";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AppUrl:string;
  ApiUrl:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ){
    this.AppUrl = environment.appUrl;
    this.ApiUrl = "/api/auth/";
   }

  login(username: string, password: string) : Observable<Token>{
    return this.http.post<Token>("https://localhost:5001/api/Auth/login", {username,password}, this.httpOptions)
    .pipe(
      tap((res: any) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token)
      })
    )

  }

  isAuth(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

  isAdmin() : boolean{
    return true;
  }

  logout():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['/']);
  }
}