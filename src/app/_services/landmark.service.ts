import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Landmark } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class LandmarkService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getLandmarks(): Observable<Landmark> {
        return this.http
          .get<Landmark>(this.apiURL + '/landmarks')
          .pipe(retry(1), catchError(this.handleError));
    }

    getLandmarksByAreaId(area_id:string): Observable<Landmark> {
        return this.http
          .get<Landmark>(this.apiURL + '/getlandmarksbyareaid/' + area_id)
          .pipe(retry(1), catchError(this.handleError));
    }

    createLandmark(landmark: any): Observable<Landmark> {
        return this.http
          .post<Landmark>(
            this.apiURL + '/landmarks',
            JSON.stringify(landmark),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getLandmark(id: any): Observable<Landmark> {
        return this.http
          .get<Landmark>(this.apiURL + '/landmarks/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateLandmark(id: any, Landmark: any): Observable<Landmark> {
        return this.http
          .put<Landmark>(
            this.apiURL + '/landmarks/' + id,
            JSON.stringify(Landmark),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteLandmark(id: any) {
        return this.http
          .delete<Landmark>(this.apiURL + '/landmarks/' + id, this.httpOptions)
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