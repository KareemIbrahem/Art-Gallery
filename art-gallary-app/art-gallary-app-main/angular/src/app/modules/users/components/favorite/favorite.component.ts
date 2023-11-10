import { Component, OnInit } from '@angular/core';
import { WhishListService } from '../../service/whish-list.service';
import { Product, WhishList } from '../../types/user-whishlist';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductResponse } from 'src/app/shared/types/product-response';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  whishListArray: Product[] | null;
  products!: ProductResponse;

  constructor(
    private whishListService: WhishListService,
    private productService: ProductService,
    private authService: AuthService,
    private router:Router
  ) {
    this.whishListArray = null;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user?.data.role == "admin" || user?.data.role == "superAdmin") {
          this.router.navigate(["/"]);
        }
      }
    });

    this.whishListService.getWhishList().subscribe({
      next: (value) => {
        this.whishListArray = value;
        this.productService.getAllProduct().subscribe({
          next: (product) => {
            this.whishListArray?.map((item) => {
              item.fav = true;
            });
            product.data = this.whishListArray!;
            this.products = product;
          },
        });
      },
    });
  }
}
