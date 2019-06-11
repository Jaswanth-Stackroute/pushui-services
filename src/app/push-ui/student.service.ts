import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private _apiUrl: string = 'https://camino.stackroute.com/api/';


  getList(body: any, _Url: string): Observable<any> {
    return this.httpClient.post(this._apiUrl + _Url, body);
  }
}
