import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { RegisterModel } from '../models/RegisterModel';

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
    return this.http.post<Token>(this.AppUrl + this.ApiUrl + "login", {username,password}, this.httpOptions)
    .pipe(
      tap((res: any) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token)
      })
    )
  }

  getUserName() : string {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(token != null && this.isAuth()){
      let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
      if(decodedJWT.role?.toLowerCase() == 'admin'){
        return (decodedJWT.unique_name + "(" + decodedJWT.role + ")") as string;
      }
      else{
        return decodedJWT.unique_name as string;
      }
    }
    return "";
  }

  isAuth(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

  isAdmin() : boolean{
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(token != null){
     
      let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
      return decodedJWT.role?.toLowerCase() == 'admin' && this.isAuth();
    }
    return false;
  }



  logout():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['/']);
  }

  register(register: RegisterModel): Observable<Object>{
    return this.http.post(this.AppUrl + this.ApiUrl + "register", register)
  }
}