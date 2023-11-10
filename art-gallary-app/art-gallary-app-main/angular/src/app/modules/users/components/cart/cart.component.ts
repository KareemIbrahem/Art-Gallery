import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { UserCartResponse } from '../../types/user-cartResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selected: string;
  shippingPrice: number;
  cartItems: UserCartResponse | null;
  message: string;
  totalPrice: number;
  ifCart: boolean;
  orderMessage: string;
  orderError: string;

  constructor(
    private authService:AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private router:Router
  ) {
    this.selected = 'Cash';
    this.cartItems = null;
    this.shippingPrice = this.cartService.getShippingPrice();
    this.message = '';
    this.totalPrice = this.shippingPrice;
    this.ifCart = false;
    this.orderMessage = '';
    this.orderError = '';
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user?.data.role == "admin" || user?.data.role == "superAdmin") {
          this.router.navigate(["/"]);
        }
      }
    });
    
    this.getLoggedUserCart();
  }

  deleteItem(itemId: string): void {
    this.cartService.removeOneCartItem(itemId).subscribe({
      next: () => {
        this.getLoggedUserCart();
      },
    });
  }

  getLoggedUserCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (userCart) => {
        this.totalPrice = userCart.data.totalPrice + this.shippingPrice;
        this.cartItems = userCart;
        this.cartService.updateCartLength(userCart);
        if (userCart.data.cartItems.length > 0) {
          this.ifCart = false;
        } else {
          this.ifCart = true;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.ifCart = true;
      },
    });
  }

  updateQuantity(quantity: number, productId: string, stock: number): void {
    console.log(quantity, stock);
    if (quantity <= stock && quantity > 0) {
      this.cartService.updateQuantity(quantity, productId).subscribe({
        next: (cart) => {
          this.cartItems = cart;
          this.totalPrice = cart.data.totalPrice + this.shippingPrice;
          this.cartService.updateCartLength(cart);
        },
      });
      this.message = '';
    }

    if (quantity > stock) {
      this.message = 'sorry out of stock..';
    }

    if (quantity == 0) {
      this.message = 'sorry you choice 0 try to delete product..';
    }
  }

  checkOut():void {
    if (!this.cartItems) {
      this.orderError = 'No cart for you..';
    }

    if (this.selected === 'Cash' && this.cartItems) {
      console.log(true);
      this.orderService.createCashOrder(this.shippingPrice).subscribe({
        next: () => {
          this.orderMessage = 'order created successfully';
          this.cartItems = null;
          this.ifCart = true;
        },
        error: (err: HttpErrorResponse) => {
          this.orderMessage = '';
          this.orderError = err.error.message;
        },
      });
    }

    if (this.selected === 'Card' && this.cartItems) {
      this.orderService.createCardOrder(this.shippingPrice).subscribe({
        next: (session) => {
          window.location.href = session.session.url;
        },
      });
    }
  }
}
