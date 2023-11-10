import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "src/environment/environment";
import { CashOrder } from "../types/cash-order";
import { StripeCheckoutResponse } from "../types/sessoin-stripe";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createCashOrder(shippingPrice: number): Observable<CashOrder> {
    const url = `${environments.apiUrl}/api/v1/order`;
    return this.http.post<CashOrder>(url, { shippingPrice });
  }

  createCardOrder(shippingPrice: number): Observable<StripeCheckoutResponse> {
    const url = `${environments.apiUrl}/api/v1/order/check-out-session`;

    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ shippingPrice }),
    };

    return this.http.get<StripeCheckoutResponse>(url, httpOptions);
  }
}
