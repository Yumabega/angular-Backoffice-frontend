import { Injectable } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { LoginObject } from '@shared/models/login-object.model'; 

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly basePath = 'api/authenticate/';

  constructor(private http: HttpClient) {}

  erroHandler(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
          return throwError(()=> ({status: 404, message:`Not Found: ${error.message}`}));
      }
      case 403: {
          return throwError(()=> ({status: 403, message:`Access Denied: ${error.message}`}));
      }
      case 500: {
          return throwError(()=> ({status: 500, message: `Internal Server Error: ${error.message}`}));
      }
      default: {
          return throwError(()=> ({code: error.status, message: error.message}));
      }

  }
  }

  loginDav(loginObj: LoginObject): Observable<Object> {    
    return this.http
      .post(this.basePath + 'login', loginObj)
      .pipe(catchError(this.erroHandler));
  }

  logoutDav(): Observable<Object> {
    return this.http
      .post(this.basePath + 'logout', {})
      .pipe(catchError(this.erroHandler));
  }
}
