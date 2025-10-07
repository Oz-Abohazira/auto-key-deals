import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private baseProductUrl = '/api/products';

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseProductUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseProductUrl}/${id}`)
    }
}
