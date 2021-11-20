import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Musician } from '../models/Musician';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService<T> {
  AppUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
  }

  getEntities(ApiUrl: string) : Observable<T[]>{
    return this.http.get<T[]>(this.AppUrl + ApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getEntity(id: number, ApiUrl: string) : Observable<T>{
    return this.http.get<T>(this.AppUrl + ApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  addEntity(entity: T, ApiUrl: string){
    return this.http.post<T>(this.AppUrl + ApiUrl, entity)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateEntity(entity: T, ApiUrl: string){
    return this.http.put<T>(this.AppUrl + ApiUrl, entity)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteEntity(id: number, ApiUrl: string){
    return this.http.delete<T>(this.AppUrl + ApiUrl + "?id=" +id)
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
