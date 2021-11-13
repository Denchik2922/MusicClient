import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Musician } from '../models/Musician';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {
  AppUrl:string;
  ApiUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
    this.ApiUrl = "/api/musical/";
  }

  getMusicians() : Observable<Musician[]>{
    return this.http.get<Musician[]>(this.AppUrl + this.ApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getMusician(id: number) : Observable<Musician>{
    return this.http.get<Musician>(this.AppUrl + this.ApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteMusician(id: number): Observable<Musician>{

    return this.http.delete<Musician>(this.AppUrl + this.ApiUrl + "?id=" +id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
