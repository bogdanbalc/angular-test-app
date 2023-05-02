import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductSalesData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _potatoSalesColumns = new BehaviorSubject<any[]>([]);
  potatoSalesColumns$ = this._potatoSalesColumns.asObservable();
  private _potatoSalesData = new BehaviorSubject<ProductSalesData[]>([]);
  potatoSalesData$ = this._potatoSalesData.asObservable();

  constructor(private http: HttpClient) {
    this.loadPotatoSalesData();
  }

  toCamelCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .reduce((s: string, c: string) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
  }

  loadPotatoSalesData() {
    this.http.get<{ column: any[]; data: any[] }>('assets/potato_sales.json').subscribe({
      next: (data) => {
        const _columns = data.column.map((c) => {
          return {
            field: c.field ? c.field : c.subHeaders ? null : this.toCamelCase(c.header),
            header: c.header,
            subHeaders: c.subHeaders,
          };
        });
        const _salesData = data.data.map((p) => {
          return {
            productID: p.productID,
            productName: p.productName,
            salesQ1: p.salesQ1,
            salesQ2: p.salesQ2,
            salesQ3: p.salesQ3,
            salesQ4: p.salesQ4,
            totalSales: p.salesQ1 + p.salesQ2 + p.salesQ3 + p.salesQ4,
          };
        });
        this._potatoSalesColumns.next(_columns);
        this._potatoSalesData.next(_salesData);
      },
      error: (error) => {
        console.error('Error loading potato_sales.json', error);
      },
    });
  }
}
