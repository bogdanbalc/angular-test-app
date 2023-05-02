import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnDestroy {
  newProductForm: FormGroup;
  errorMessage = '';
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private productService: ProductService) {
    this.newProductForm = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      productID: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999999999999)]),
      productManager: new FormControl('', Validators.maxLength(30)),
      salesStartDate: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.newProductForm.valid) {
      this.subscription = this.productService.addProduct(this.newProductForm.value).subscribe({
        next: () => {
          this.newProductForm.reset(); // Reset the form on submit success
          console.log('Product added successfully');
          this.router.navigate(['/sales']);
        },
        error: () => {
          this.errorMessage = 'An error occurred while adding the product. Please try again.';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
