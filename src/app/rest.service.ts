import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  apiId = 'b6907d289e10d714a6e88b30761fae22&_=1563365150617';
  // Fetch weather data
  getWeatherData(lat: any, long: any): Observable<any> {
    const url = `https://openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=10&appid=${this.apiId}`;
    return this.http.get(url).pipe(
      map((res: any) => res), catchError(this.handleError));
  }
  // Fetch location lat lon
  getlatLong(city: any): Observable<any> {
    const url = `https://openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&cnt=30&appid=${this.apiId}`;
    return this.http.get(url).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
