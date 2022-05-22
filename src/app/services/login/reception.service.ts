import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  readonly basePath = 'api/reception/';

  constructor(private http: HttpClient) {}

  public getAllAppsByRol(){
    return this.http.get(`${this.basePath}`);
  }
}
