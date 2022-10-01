import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { Area } from '../_models';

@Injectable({ providedIn: 'root' })

export class AreaService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getAreas(): Observable<Area> {
        return this.http
          .get<Area>(this.apiURL + '/areas')
          .pipe(retry(1), catchError(this.handleError));
    }

    getAreasByCityId(city_id:string): Observable<Area> {
        return this.http
          .get<Area>(this.apiURL + '/getareasbycityid/' + city_id)
          .pipe(retry(1), catchError(this.handleError));
    }

    createArea(employee: any): Observable<Area> {
        return this.http
          .post<Area>(
            this.apiURL + '/areas',
            JSON.stringify(employee),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getArea(id: any): Observable<Area> {
        return this.http
          .get<Area>(this.apiURL + '/areas/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateArea(id: any, Area: any): Observable<Area> {
        return this.http
          .put<Area>(
            this.apiURL + '/areas/' + id,
            JSON.stringify(Area),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteArea(id: any) {
        return this.http
          .delete<Area>(this.apiURL + '/areas/' + id, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
      }

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) 
            errorMessage = error.error.message;
        else
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        
        window.alert(errorMessage);

        return throwError(() => {
            return errorMessage;
        });
    }
}