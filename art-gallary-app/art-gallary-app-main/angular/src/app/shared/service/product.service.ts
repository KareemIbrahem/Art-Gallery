import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "src/environment/environment";
import { ProductResponse } from "../types/product-response";
import { Product } from "../types/product";
import { ReviewResponse } from "./../types/review-response";
import { ReviewUpdate } from "../types/review-update";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProduct(params?: {
    [key: string]: string;
  }): Observable<ProductResponse> {
    let queryParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams = queryParams.append(key, params[key]);
        }
      }
    }

    const url = `${environments.apiUrl}/api/v1/product`;
    return this.http.get<ProductResponse>(url, { params: queryParams });
  }

  getOneProduct(id: string): Observable<Product> {
    const url = `${environments.apiUrl}/api/v1/product/${id}`;
    return this.http.get<Product>(url);
  }

  updateProductView(id: string): Observable<{ status: string }> {
    const url = `${environments.apiUrl}/api/v1/product/view/${id}`;
    return this.http.patch<{ status: string }>(url, {});
  }

  createReview(data: {
    title?: string;
    rating?: number;
    product: string;
  }): Observable<ReviewResponse> {
    const url = `${environments.apiUrl}/api/v1/review`;
    return this.http.post<ReviewResponse>(url, data);
  }

  updateReview(
    data: { title?: string; rating?: number },
    reviewId: string
  ): Observable<ReviewUpdate> {
    const url = `${environments.apiUrl}/api/v1/review/${reviewId}`;
    return this.http.patch<ReviewUpdate>(url, data);
  }

  deleteReview(reviewId: string) {
    const url = `${environments.apiUrl}/api/v1/review/${reviewId}`;
    return this.http.delete(url);
  }

  addProduct(formData: FormData): Observable<Product> {
    const url = `${environments.apiUrl}/api/v1/product`;
    return this.http.post<Product>(url, formData);
  }

  updateProduct(formData: FormData, id: string): Observable<Product> {
    const url = `${environments.apiUrl}/api/v1/product/${id}`;
    return this.http.patch<Product>(url, formData);
  }

  deleteProduct(id: string) {
    const url = `${environments.apiUrl}/api/v1/product/${id}`;
    return this.http.delete(url);
  }
}
