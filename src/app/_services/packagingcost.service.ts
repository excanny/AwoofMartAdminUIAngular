import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PackagingCost } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class PackagingCostService {

  apiURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getPackagingCosts(): Observable<PackagingCost> {
        return this.http
          .get<PackagingCost>(this.apiURL + '/packagingcosts')
          .pipe(retry(1), catchError(this.handleError));
    }

    createPackagingCost(employee: any): Observable<PackagingCost> {
        return this.http
          .post<PackagingCost>(
            this.apiURL + '/packagingcosts',
            JSON.stringify(employee),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getPackagingCost(id: any): Observable<PackagingCost> {
        return this.http
          .get<PackagingCost>(this.apiURL + '/packagingcosts/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updatePackagingCost(id: any, PackagingCost: any): Observable<PackagingCost> {
        return this.http
          .put<PackagingCost>(
            this.apiURL + '/packagingcosts/' + id,
            JSON.stringify(PackagingCost),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deletePackagingCost(id: any) {
        return this.http
          .delete<PackagingCost>(this.apiURL + '/packagingcosts/' + id, this.httpOptions)
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