import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { City } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class CityService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getCities(): Observable<City> {
        return this.http
          .get<City>(this.apiURL + '/cities')
          .pipe(retry(1), catchError(this.handleError));
    }

    getCity(id: any): Observable<City> {
      return this.http
        .get<City>(this.apiURL + '/cities/' + id)
        .pipe(retry(1), catchError(this.handleError));
  }

    createCity(city: any): Observable<City> {
        return this.http
          .post<City>(
            this.apiURL + '/cities',
            JSON.stringify(city),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      updateCity(id: any, City: any): Observable<City> {
        return this.http
          .put<City>(
            this.apiURL + '/cities/' + id,
            JSON.stringify(City),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteCity(id: any) {
        return this.http
          .delete<City>(this.apiURL + '/cities/' + id, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
      }

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) errorMessage = error.error.message;
        else errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        
        window.alert(errorMessage);

        return throwError(() => {
            return errorMessage;
        });
    }
}