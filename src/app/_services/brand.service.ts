import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { Brand } from '../_models';

@Injectable({ providedIn: 'root' })

export class BrandService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getBrands(): Observable<Brand> {
        return this.http
          .get<Brand>(this.apiURL + '/brands')
          .pipe(retry(1), catchError(this.handleError));
    }

    createBrand(brand: any): Observable<Brand> {
        return this.http
          .post<Brand>(
            this.apiURL + '/brands',
            JSON.stringify(brand),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getBrand(id: any): Observable<Brand> {
        return this.http
          .get<Brand>(this.apiURL + '/brands/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateBrand(id: any, Brand: any): Observable<Brand> {
        return this.http
          .put<Brand>(
            this.apiURL + '/brands/' + id,
            JSON.stringify(Brand),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteBrand(id: any) {
        return this.http
          .delete<Brand>(this.apiURL + '/brands/' + id, this.httpOptions)
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