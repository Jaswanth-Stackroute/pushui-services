import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() { }
  private token: string = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1S3RNazNCdDVOTC1QWWNSbV9iSk1Ndm4teWFGeDhoc2NyOUVXZDZwdzhVIn0.eyJqdGkiOiI2MDcyNTc4Yy00ZmZjLTRkOTMtOWIxZS0wYTA3MGI2MjQ3NGUiLCJleHAiOjE1NjAyNzc5MTYsIm5iZiI6MCwiaWF0IjoxNTYwMjU2MzE2LCJpc3MiOiJodHRwczovL2NhbWluby5zdGFja3JvdXRlLmNvbS9hdXRoL3JlYWxtcy9zdW5iaXJkIiwiYXVkIjoiYWRtaW4tY2xpIiwic3ViIjoiNmYzMjRkYjctMzJhNS00NDM3LWE0NTEtMzVjZjUzMjY5YWFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNmYxYWZjZjktNzQ3ZC00YTIxLThiNzgtZjlkMmQwNWYyZTIzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlc291cmNlX2FjY2VzcyI6e30sIm5hbWUiOiJBZGl0eWEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZGl0eWEiLCJnaXZlbl9uYW1lIjoiQWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAbmlpdC5jb20ifQ.OcGvlBwFWh8l7ObHNnuZImJzT3Ym8g8-V_7lZsJh9jjXX5BOx4b3LPXDCHOsEMCxfZnE1BJFozw5AClVRn3Si-YQTGry7rfDLs4PEMD5ZBx9pyAvx0C5fzFvNIlH7tL_L4xysCxJxDD4yYBFI9_8ZINY1qGfFKOAh3XsTTGGLDOo3hePjhiuJ5_5-hlN48YDVL3lNRwbgp-2afArbTgBdsdVzhnuCIzw4y64kG_NY92Coy8Ak2Zxeh_9UU-GizZsL-bKruca_m9kDkqLFpnIsYRmVG9T4qaIYLSbabs8G7mIPjuID0v0ZDpwuHq1Asc2f62ScIQeQ4Z6dK6BDE7G_A';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmMzU5MzdlOWZmY2U0OWVjOTFhMWM2ZjNiMGRkODNjZSJ9.-TFevs_hwibGVswDBJhhgcJ3I4jEi1_dWuiNHsqMOoc',
          'x-authenticated-user-token': this.token,
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    if (!request.headers.has('cache-control')) {
      request = request.clone({
        setHeaders: {
          'cache-control': 'no-cache'
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      retry(2),
      catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
