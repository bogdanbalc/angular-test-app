import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductService } from '../product/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  private defaultData: Product[] = [];
  products: Product[] = [];
  columns: any[] = [];
  shouldRecalculateTotals = false;
  flattenedColumns: any[] = [];
  nonEditableColumns: string[] = ['productID', 'totalSales'];

  constructor(private productService: ProductService) {
    this.productService.getColumns().subscribe((columns) => {
      this.columns = [...columns];
      this.flattenedColumns = this.flattenColumns(this.columns);
    });
    this.productService.getProducts().subscribe((products) => {
      this.defaultData = [...products];
      this.products = [...products];
    });
  }

  resetTable(table: Table, search: HTMLInputElement) {
    table.reset();
    // reset table search
    search.value = '';
    this.products = [...this.defaultData];
  }

  computeTotalSales(salesQ1: number, salesQ2: number, salesQ3: number, salesQ4: number) {
    return salesQ1 + salesQ2 + salesQ3 + salesQ4;
  }

  onEditComplete(event: any) {
    this.shouldRecalculateTotals = true;
  }

  flattenColumns(cols: any) {
    return cols.reduce((acc: any, item: any) => {
      if (item.subHeaders) {
        acc = [...acc, ...item.subHeaders];
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  isNumericField(val: any) {
    // if input value is null assume it is a number
    return val === null || typeof val === 'number';
  }
}
