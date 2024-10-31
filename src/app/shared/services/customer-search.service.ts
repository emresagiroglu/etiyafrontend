import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerListResponse } from '../models/customer/customerListResponse';
import { CustomerSearchResponse } from '../models/customer/customerSearchResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {

  constructor(private httpClient: HttpClient) { }

  private readonly controllerUrl= 'http://localhost:8085/api/search'  //sonradan apigateway e bağlanacak!

  getCustomers(): Observable<CustomerListResponse[]>{
    const url = `${this.controllerUrl}/getAll`; 
    return this.httpClient.get<CustomerListResponse[]>(url);
  }


}
