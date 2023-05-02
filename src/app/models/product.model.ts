// Define Base Product interface
export interface BaseProduct {
  productID: number;
  productName: string;
}

// Define New Product interface
export interface NewProduct extends BaseProduct {
  productManager?: string;
  salesStartDate: Date;
}

// Define Product Sales interface
export interface ProductSalesData extends BaseProduct {
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
  totalSales: number;
}

// Define Product interface
export interface Product {
  productID: number;
  productName: string;
  productManager?: string;
  salesStartDate?: Date;
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
  totalSales: number;
}
