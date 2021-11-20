import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { MusicInstrument } from '../models/MusicInstrument';


@Injectable({
  providedIn: 'root'
})
export class MusicInstrumentsService {

  AppUrl:string;
  ApiUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
    this.ApiUrl = "/api/MusicInstrument/";
  }

  getInstruments() : Observable<MusicInstrument[]>{
    return this.http.get<MusicInstrument[]>(this.AppUrl + this.ApiUrl)
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
