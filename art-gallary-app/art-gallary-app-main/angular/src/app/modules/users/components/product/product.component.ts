import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductResponse } from 'src/app/shared/types/product-response';
import { CartService } from '../../service/cart.service';
import { WhishListService } from '../../service/whish-list.service';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CurentUser } from 'src/app/modules/auth/types/current-user';
import { ProductService } from 'src/app/shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() products!: ProductResponse;
  @Output() loadMoreEvent!: EventEmitter<{ page: number }>;
  @Input() ifLoad: boolean;
  isClicked: boolean;
  currentUser: CurentUser | null;

  constructor(
    private cartService: CartService,
    private whishListService: WhishListService,
    private authService: AuthService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.loadMoreEvent = new EventEmitter<{ page: number }>();
    this.ifLoad = false;
    this.isClicked = false;
    this.currentUser = null;
  };

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  loadMore() {
    this.loadMoreEvent.emit({ page: this.products.paginateResult.next || 0 });
  }

  addToCart(id: string): void {
    this.cartService.addToCart(id).subscribe({
      next: (cart) => {
        this.cartService.updateCartLength(cart);
      },
    });
  }

  addToFavorite(id: string , product:any): void {
    if (this.whishListService.checkWishList(id)) {
      product.fav = !product.fav;
      this.isClicked = true;
      this.whishListService.deleteItemFromWhishList(id).subscribe({
        next: (user) => {
          this.whishListService.setWhisList(user);
        },
      });
    } else {
      product.fav = !product.fav;
      this.isClicked = true;
      this.whishListService.addToWhishList(id).subscribe({
        next: (user) => {
          this.whishListService.setWhisList(user);
        },
      });
    }
  }

  toggleFavorite(product: any) {
    product.fav = !product.fav;
    this.isClicked = true;
  }

  deleteProduct(id: string): void{
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success("product deleted Successfully");
        this.productService.getAllProduct().subscribe({
          next: (product) => {
            this.products = product;
          }
        });
      }
    });
  }

}
