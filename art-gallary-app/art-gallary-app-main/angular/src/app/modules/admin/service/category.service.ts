import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AddCatogryResponse,
  CatgoryResponse,
} from "../types/category-response";
import { environments } from "src/environment/environment";
import { OneCatgoryResponse } from "../types/oneCatgory-response";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCatogry(): Observable<CatgoryResponse> {
    const url = `${environments.apiUrl}/api/v1/category`;
    return this.http.get<CatgoryResponse>(url);
  }

  getOneCategory(id: string): Observable<OneCatgoryResponse> {
    const url = `${environments.apiUrl}/api/v1/category/${id}`;
    return this.http.get<OneCatgoryResponse>(url);
  }

  deleteCatgory(id: string) {
    const url = `${environments.apiUrl}/api/v1/category/${id}`;
    return this.http.delete(url);
  }

  updateCatogry(
    id: string,
    data: { name: string }
  ): Observable<AddCatogryResponse> {
    const url = `${environments.apiUrl}/api/v1/category/${id}`;
    return this.http.patch<AddCatogryResponse>(url, data);
  }

  addCatogry(data: { name: string }): Observable<AddCatogryResponse> {
    const url = `${environments.apiUrl}/api/v1/category`;
    return this.http.post<AddCatogryResponse>(url, data);
  }
}
