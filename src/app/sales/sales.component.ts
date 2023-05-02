import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductService } from '../product/product.service';
import { ProductSalesData } from '../models/product.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  private defaultData: ProductSalesData[] = [];
  products: ProductSalesData[] = [];
  columns: any[] = [];
  shouldRecalculateTotals = false;

  constructor(private productService: ProductService) {
    this.productService.getColumns().subscribe((columns) => {
      this.columns = [...columns];
    });
    this.productService.getSalesData().subscribe((products) => {
      this.defaultData = [...products];
      this.products = [...products];
    });
  }

  resetTable(table: Table) {
    table.reset();
    this.products = [...this.defaultData];
  }

  computeTotalSales(salesQ1: number, salesQ2: number, salesQ3: number, salesQ4: number) {
    return salesQ1 + salesQ2 + salesQ3 + salesQ4;
  }

  onEditComplete(event: any) {
    this.shouldRecalculateTotals = true;
  }
}
