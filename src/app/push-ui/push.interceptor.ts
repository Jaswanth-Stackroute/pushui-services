import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() { }
  private token: string = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1S3RNazNCdDVOTC1QWWNSbV9iSk1Ndm4teWFGeDhoc2NyOUVXZDZwdzhVIn0.eyJqdGkiOiIwOTE3ZDg1NC05NDI2LTQ5ZGUtOTkwNy1kZjVhYTNkZTQwMWMiLCJleHAiOjE1NjAzMzE2MTIsIm5iZiI6MCwiaWF0IjoxNTYwMzEwMDEyLCJpc3MiOiJodHRwczovL2NhbWluby5zdGFja3JvdXRlLmNvbS9hdXRoL3JlYWxtcy9zdW5iaXJkIiwiYXVkIjoiYWRtaW4tY2xpIiwic3ViIjoiNmYzMjRkYjctMzJhNS00NDM3LWE0NTEtMzVjZjUzMjY5YWFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNzE1ZDNiZDAtMWQ0OC00ZjZmLTk2OWEtYTk3MzlmN2UzNjg1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlc291cmNlX2FjY2VzcyI6e30sIm5hbWUiOiJBZGl0eWEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZGl0eWEiLCJnaXZlbl9uYW1lIjoiQWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAbmlpdC5jb20ifQ.e7rjB-t-VI7jDCms1A_fwSKuKD4Rjrsrljngd6-L7ZoJhK46zUNaWF4zqqJTdqXKmwi8klBG0Zbuh8ak-zjCJ-wkFvsW-riZFyQy8CBABwSjOEArsssx6RXMC_Eed-1xhc7oJ7t4Gx3HQwqCz2QcJqHfG51mmPm0_kQ9fT7Xw7z0wuMBiE5Gf9PObkpMq-XLBo6XdiXJa88hFEjDk9bbp1Um3P2fgnjTRL5zZHkyMGOFPqkNLShS0hKXa4UQPMF070vrDfnK06jCarhiBYtapP31d3E7VqAGlO3xXwdAqeMV50mcqStZm4CWSVQxOVmiGwLuiX4wJjZNvDWuewkW4A';

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
