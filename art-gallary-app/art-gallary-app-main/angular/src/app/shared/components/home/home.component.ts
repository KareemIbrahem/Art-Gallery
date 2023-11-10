import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductResponse } from '../../types/product-response';
import { Product } from '../../types/product';
import { WhishListService } from 'src/app/modules/users/service/whish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products!: ProductResponse;

  constructor(
    private productService: ProductService,
    private whishListService: WhishListService
  ) {}

  ngOnInit(): void {
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
        this.products = this.whishListService.updateFavInProduct(product);
      },
    });
  }
}
