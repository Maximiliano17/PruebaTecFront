// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://booking-api-test.fusionpax.com/api/v1/paymentMethods';

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.baseUrl}/list`);
  }

  getPaymentMethodDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/detail/${id}`);
  }

  updatePaymentMethod(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, payload);
  }

  deletePaymentMethod(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  createPaymentMethod(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, formData);
  }
}