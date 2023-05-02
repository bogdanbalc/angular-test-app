import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Product, NewProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private columns: any[] = [];
  private columns$: BehaviorSubject<any[]>;
  private products: Product[] = [];
  private products$: BehaviorSubject<Product[]>;

  constructor(private dataService: DataService) {
    this.dataService.potatoSalesData$.subscribe((data) => {
      if (data.length) {
        this.products = data;
        this.products$.next(this.products);
      }
    });
    this.dataService.potatoSalesColumns$.subscribe((data) => {
      if (data.length) {
        this.columns = data;
        this.columns$.next(this.columns);
      }
    });
    this.columns$ = new BehaviorSubject<any[]>(this.columns);
    this.products$ = new BehaviorSubject<Product[]>(this.products);
  }

  // Getter for coluumns
  getColumns() {
    return this.columns$.asObservable();
  }

  // Getter for products
  getProducts() {
    return this.products$.asObservable();
  }

  // Add new product
  addProduct(product: NewProduct): Observable<Product> {
    const _product: Product = {
      productID: product.productID,
      productName: product.productName,
      productManager: product.productManager,
      salesStartDate: product.salesStartDate,
      salesQ1: 0,
      salesQ2: 0,
      salesQ3: 0,
      salesQ4: 0,
      totalSales: 0,
    };
    this.products.push(_product);
    this.products$.next(this.products);
    // add delay to simulate server response
    return of(_product).pipe(delay(250));
  }
}
