import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  AppUrl:string;
  ApiUrl:string;

  constructor(private http: HttpClient) { 
    this.AppUrl = environment.appUrl;
    this.ApiUrl = "/api/genre/";
  }

  getGenres() : Observable<Genre[]>{
    return this.http.get<Genre[]>(this.AppUrl + this.ApiUrl);
  }

}
