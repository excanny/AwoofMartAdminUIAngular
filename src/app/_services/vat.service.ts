import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { Vat } from '../_models';

@Injectable({ providedIn: 'root' })

export class VatService {

    apiURL = environment.baseUrl;
    
    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getVats(): Observable<Vat> {
        return this.http
          .get<Vat>(this.apiURL + '/vats')
          .pipe(retry(1), catchError(this.handleError));
    }

    updateVat(vat: any): Observable<Vat> {
        return this.http
          .put<Vat>(
            this.apiURL + '/vats',
            JSON.stringify(vat),
            this.httpOptions
          )
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