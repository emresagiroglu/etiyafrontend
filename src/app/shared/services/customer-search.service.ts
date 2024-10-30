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


  searchCustomer(
    nationalityId?: string,
    id?: string,
    accountNumber?: string,
    mobilePhone?: string,
    firstName?: string,
    lastName?: string,
    orderNumber?: string,
    sortField?: string,
    sortOrder?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (nationalityId) params = params.set('nationalityId', nationalityId);
    if (id) params = params.set('id', id);
    if (accountNumber) params = params.set('accountNumber', accountNumber);
    if (mobilePhone) params = params.set('mobilePhone', mobilePhone);
    if (firstName) params = params.set('firstName', firstName);
    if (lastName) params = params.set('lastName', lastName);
    if (orderNumber) params = params.set('orderNumber', orderNumber);
    if (sortField) params = params.set('sortField', sortField);
    if (sortOrder) params = params.set('sortOrder', sortOrder);

    return this.httpClient.get<CustomerSearchResponse>(this.controllerUrl, { params });
  }



}
