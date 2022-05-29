import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }


  public doGet<T>(serviceUrl: string): Observable<T> {
    return this.http.get<T>(serviceUrl);
  }

  public doPost<T, R>(serviceUrl: string, body: T): Observable<R> {
    return this.http.post<R>(serviceUrl, body);
  }

  public doPut<T, R>(serviceUrl: string, body: T): Observable<R> {
    return this.http.put<R>(serviceUrl, body);
  }

  public doDelete<T>(serviceUrl: string): Observable<T> {
    return this.http.delete<T>(serviceUrl);
  }
}
