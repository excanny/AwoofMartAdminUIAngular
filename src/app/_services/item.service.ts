import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Item } from '../_models';
import { environment } from "../_environments";

@Injectable({ providedIn: 'root' })

export class ItemService {

    apiURL = environment.baseUrl;
  
    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getItems(): Observable<Item> {
        return this.http
          .get<Item>(this.apiURL + '/items')
          .pipe(retry(1), catchError(this.handleError));
    }

    createItem(sku_weight: string, item_name: string, domain_id: string, description: string, parent_category_id: string, sub_category_id: string, child_category_id: string,  sku_name: string, item_image_name: File): Observable<Item> {

      const formData: FormData = new FormData();
      formData.append('sku_weight', sku_weight);
      formData.append('item_name', item_name);
      formData.append('domain_id', domain_id);
      formData.append('description', description);
      formData.append('parent_category_id', parent_category_id);
      formData.append('sub_category_id', sub_category_id);
      formData.append('child_category_id', child_category_id);
      formData.append('sku_name', sku_name);
      formData.append('item_image_name', item_image_name);

        return this.http
          .post<Item>(this.apiURL + '/items', formData)
          .pipe(retry(1), catchError(this.handleError));
      }

      getItem(id: any): Observable<Item> {
        return this.http
          .get<Item>(this.apiURL + '/items/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateItem(id: any, Item: any): Observable<Item> {
        return this.http
          .put<Item>(
            this.apiURL + '/items/' + id,
            JSON.stringify(Item),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteItem(id: any) {
        return this.http
          .delete<Item>(this.apiURL + '/items/' + id, this.httpOptions)
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