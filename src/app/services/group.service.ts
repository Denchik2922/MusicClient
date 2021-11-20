import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Musician } from '../models/Musician';
import { retry, catchError } from 'rxjs/operators';
import { Group } from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  AppUrl:string;
  ApiUrl:string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.appUrl;
    this.ApiUrl = "/api/group/";
  }

  getGroups() : Observable<Group[]>{
    return this.http.get<Group[]>("https://localhost:5001/api/Group")
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getGroup(id: number) : Observable<Group>{
    return this.http.get<Group>(this.AppUrl + this.ApiUrl + id)
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
