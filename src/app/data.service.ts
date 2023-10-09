import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/products/1`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products/add`, item);
  }

  editItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/1`, item);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/1`);
  }
}
