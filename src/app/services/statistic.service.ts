import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryWithMusician } from '../models/CountryWithMusician';
import { TopInstrument } from '../models/TopInstrument';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  AppUrl:string;
  StatisticUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
    this.StatisticUrl = environment.statisticUrl;
  }

  getTopInstruments() : Observable<TopInstrument[]>{
    return this.http.get<TopInstrument[]>(this.AppUrl + this.StatisticUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getAverageCostOfConcert() : Observable<number>{
    return this.http.get<number>(this.AppUrl + this.StatisticUrl + "concerts_average")
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCountriesWithMostMusicians() : Observable<CountryWithMusician[]>{
    return this.http.get<CountryWithMusician[]>(this.AppUrl + this.StatisticUrl + "country_musicans")
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
