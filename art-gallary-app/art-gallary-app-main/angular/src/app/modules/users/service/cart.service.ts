import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environments } from "src/environment/environment";
import { UserCartResponse } from "../types/user-cartResponse";
import { AddToCartResponse } from "../types/addToCart-response";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private shippingPrice: number;
  private cartLength!: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.shippingPrice = parseInt(localStorage.getItem("shippingPrice")!) || 50;
    this.cartLength = new BehaviorSubject(0);
    this.getUserCart().subscribe({
      next: (cart) => {
        this.updateCartLength(cart);
      },
    });
  }

  setShippingPrice(shippingPrice: number): void {
    localStorage.setItem("shippingPrice", `${shippingPrice}`);
  }

  getShippingPrice(): number {
    return this.shippingPrice;
  }

  updateCartLength(cart: UserCartResponse | AddToCartResponse): void {
    let itemLength = 0;
    cart.data.cartItems.forEach((cart) => {
      itemLength += cart.quantity;
    });
    this.cartLength.next(itemLength);
  }

  getCartLength(): Observable<number> {
    return this.cartLength.asObservable();
  }

  getUserCart(): Observable<UserCartResponse> {
    const url = `${environments.apiUrl}/api/v1/cart`;
    return this.http.get<UserCartResponse>(url);
  }

  addToCart(productId: string): Observable<AddToCartResponse> {
    const url = `${environments.apiUrl}/api/v1/cart`;
    return this.http.post<AddToCartResponse>(url, { productId: productId });
  }

  removeOneCartItem(itemId: string) {
    const url = `${environments.apiUrl}/api/v1/cart/${itemId}`;
    return this.http.delete(url);
  }

  updateQuantity(
    quantity: number,
    productId: string
  ): Observable<UserCartResponse> {
    const url = `${environments.apiUrl}/api/v1/cart/${productId}`;
    return this.http.patch<UserCartResponse>(url, { quantity });
  }
}
