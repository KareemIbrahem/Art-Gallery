import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductResponse } from 'src/app/shared/types/product-response';
import { WhishListService } from '../../service/whish-list.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  filterForm: FormGroup;
  products!: ProductResponse;

  constructor(private fb: FormBuilder, private productService: ProductService , private whishListService:WhishListService) {
    this.filterForm = this.fb.group({
      search: [''],
      filter: [''],
    });
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (product) => {
        this.products = this.whishListService.updateFavInProduct(product);
      },
    });
  }

  onEventEmit(event: { page: number }): void {
    if (event.page === 0) {
      return;
    }

    const params = {
      page: `${event.page}`,
    };
    this.productService.getAllProduct(params).subscribe({
      next: (product: ProductResponse) => {
        product.data = [...this.products.data, ...product.data];
        this.products = this.whishListService.updateFavInProduct(product);;
      },
    });
  }

  onSubmit(): void {
    const params: { keyword?: string; sort?: string } = {};
    if (this.filterForm.value.search) {
      params.keyword = this.filterForm.value.search;
    }
    if (this.filterForm.value.filter) {
      params.sort = this.filterForm.value.filter.join(',');
    }

    this.productService.getAllProduct(params).subscribe({
      next: (product) => {
        this.products = this.whishListService.updateFavInProduct(product);;
      },
    });
  }
}
