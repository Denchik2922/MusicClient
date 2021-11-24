import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concert } from '../models/Concert';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  AppUrl:string;
  EventUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
    this.EventUrl = environment.eventUrl;
  }

  getConcerts() : Observable<Concert[]>{
    return this.http.get<Concert[]>(this.AppUrl + this.EventUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getConcert(id: number) : Observable<Concert>{
    return this.http.get<Concert>(this.AppUrl + this.EventUrl + id)
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
