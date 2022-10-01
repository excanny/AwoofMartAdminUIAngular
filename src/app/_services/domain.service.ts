import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { Domain } from '../_models';

@Injectable({ providedIn: 'root' })

export class DomainService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getDomains(): Observable<Domain> {
        return this.http
          .get<Domain>(this.apiURL + '/domains')
          .pipe(retry(1), catchError(this.handleError));
    }

    createDomain(domain: any): Observable<Domain> {
        return this.http
          .post<Domain>(
            this.apiURL + '/domains',
            JSON.stringify(domain),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getDomain(id: any): Observable<Domain> {
        return this.http
          .get<Domain>(this.apiURL + '/domains/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      getDomainName(id: any): Observable<Domain> {
        return this.http
          .get<Domain>(this.apiURL + '/getdomainname/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateDomain(id: any, domain: any): Observable<Domain> {
        return this.http
          .put<Domain>(
            this.apiURL + '/domains/' + id,
            JSON.stringify(domain),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteDomain(id: any) {
        return this.http
          .delete<Domain>(this.apiURL + '/domains/' + id, this.httpOptions)
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