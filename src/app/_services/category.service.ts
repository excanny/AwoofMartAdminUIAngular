import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class CategoryService {

  apiURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getCategories(): Observable<Category> {
        return this.http
          .get<Category>(this.apiURL + '/categories')
          .pipe(retry(1), catchError(this.handleError));
    }

    getParentCategories(): Observable<Category> {
        return this.http
          .get<Category>(this.apiURL + '/getparentcategories')
          .pipe(retry(1), catchError(this.handleError));
    }

    getSubCategories(id:number): Observable<Category> {
        return this.http
          .get<Category>(this.apiURL + '/getsubcategories/'+ id)
          .pipe(retry(1), catchError(this.handleError));
    }
    
    createCategory(category_name: string, domain_id: string, description: string, parent_id: string, allow_merchant_upload: string, category_image_name: File): Observable<Category> {
  
        const formData: FormData = new FormData();
        formData.append('category_name', category_name);
        formData.append('domain_id', domain_id);
        formData.append('description', description);
        formData.append('parent_id', parent_id);
        formData.append('allow_merchant_upload', allow_merchant_upload);
        formData.append('category_image_name', category_image_name);
        
        return this.http
        .post<Category>(this.apiURL + '/categories', formData)
        .pipe(retry(1), catchError(this.handleError));
           
    }

    getCategory(id: any): Observable<Category> {
        return this.http
          .get<Category>(this.apiURL + '/categories/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateCategory(id: any, Category: any): Observable<Category> {
        return this.http
          .put<Category>(
            this.apiURL + '/categories/' + id,
            JSON.stringify(Category),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteCategory(id: any) {
        return this.http
          .delete<Category>(this.apiURL + '/categories/' + id, this.httpOptions)
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