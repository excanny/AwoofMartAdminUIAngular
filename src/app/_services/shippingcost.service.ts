import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ShippingCost } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class ShippingCostService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getShippingCosts(): Observable<ShippingCost> {
        return this.http
          .get<ShippingCost>(this.apiURL + '/shippingcosts')
          .pipe(retry(1), catchError(this.handleError));
    }

    createShippingCost(shippingcost: any): Observable<ShippingCost> {
        return this.http
          .post<ShippingCost>(
            this.apiURL + '/shippingcosts',
            JSON.stringify(shippingcost),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getShippingCost(id: any): Observable<ShippingCost> {
        return this.http
          .get<ShippingCost>(this.apiURL + '/shippingcosts/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateShippingCost(id: any, ShippingCost: any): Observable<ShippingCost> {
        return this.http
          .put<ShippingCost>(
            this.apiURL + '/shippingcosts/' + id,
            JSON.stringify(ShippingCost),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteShippingCost(id: any) {
        return this.http
          .delete<ShippingCost>(this.apiURL + '/shippingcosts/' + id, this.httpOptions)
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