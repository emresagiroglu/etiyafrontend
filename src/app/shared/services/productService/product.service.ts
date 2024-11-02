import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/catalogs/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  searchProducts(
    productId?: string,
    productName?: string
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (productId) {
      params = params.set('productId', productId);
    }
    if (productName) {
      params = params.set('productName', productName);
    }
    return this.http.get<Product[]>(this.baseUrl, { params });
  }
}
