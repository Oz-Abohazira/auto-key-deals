import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private baseProductUrl = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseProductUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseProductUrl}/${id}`)
    }
}
