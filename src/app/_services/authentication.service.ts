import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { User } from '../_models';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    adminlogin(user: any): Observable<User> {
        return this.http
        .post<User>(
            this.apiURL + '/admin/login',
            JSON.stringify(user),
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    logout() {
        return this.http
        .post(
            this.apiURL + '/admin/logout', this.httpOptions
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