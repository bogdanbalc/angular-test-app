import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Product, NewProduct, ProductSalesData } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private columns: any[] = [];
  private columns$: BehaviorSubject<any[]>;
  private products: Product[] = [];
  private products$: BehaviorSubject<Product[]>;
  private salesData: ProductSalesData[] = [];
  private salesData$: BehaviorSubject<ProductSalesData[]>;

  constructor(private dataService: DataService) {
    this.dataService.potatoSalesData$.subscribe((data) => {
      if (data.length) {
        this.salesData = data;
        this.products = data;
        this.products$.next(this.products);
        this.salesData$.next(this.salesData);
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
    this.salesData$ = new BehaviorSubject<ProductSalesData[]>(this.salesData);
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
    let _product: Product = {
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
    this.salesData$.next(this.products);
    return of(_product).pipe(delay(1000));
  }

  // Getter for sales data
  getSalesData() {
    return this.salesData$.asObservable();
  }
}
