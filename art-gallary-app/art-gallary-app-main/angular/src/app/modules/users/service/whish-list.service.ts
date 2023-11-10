import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "../../auth/service/auth.service";
import { Product, WhishList } from "../types/user-whishlist";
import { CurentUser } from "../../auth/types/current-user";
import { environments } from "src/environment/environment";
import { ProductResponse } from "src/app/shared/types/product-response";

@Injectable({
  providedIn: "root",
})
export class WhishListService {
  private whishList = new BehaviorSubject<Product[] | null>(null);
  favoriteLength: BehaviorSubject<number>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.favoriteLength = new BehaviorSubject(0);
    this.LoggedUserWhisList();
  }

  LoggedUserWhisList() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user!.data.wishList.length > 0) {
          let whishList: Product[] = [];
          user?.data.wishList.forEach((product) => {
            whishList.push(product.product);
          });
          this.whishList.next(whishList);
          this.setFavoriteLength(whishList);
        } else {
          this.whishList.next(null);
        }
      },
    });
  }

  getWhishList(): Observable<Product[] | null> {
    return this.whishList.asObservable();
  }

  setWhisList(user: CurentUser): void {
    if (user!.data.wishList.length > 0) {
      let whishList: Product[] = [];
      user?.data.wishList.forEach((product) => {
        whishList.push(product.product);
      });
      this.whishList.next(whishList);
      console.log(whishList);
      this.setFavoriteLength(whishList);
    } else {
      this.whishList.next(null);
      this.favoriteLength.next(0);
    }
  }

  setFavoriteLength(whishList: Product[] | null) {
    if (whishList) {
      this.favoriteLength.next(whishList.length);
    } else {
      this.favoriteLength.next(0);
    }
  }

  getFavoriteLength(): Observable<number> {
    return this.favoriteLength.asObservable();
  }

  checkWishList(id: string): boolean {
    if (!(this.whishList.getValue()?.length == undefined)) {
      const foundItem = this.whishList
        .getValue()!
        .find((item) => item._id === id);
      if (foundItem) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  addToWhishList(productId: string): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/whishList`;
    return this.http.post<CurentUser>(url, { productId });
  }

  deleteItemFromWhishList(productId: string): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/whishList/${productId}`;
    return this.http.delete<CurentUser>(url);
  }

  updateFavInProduct(products: ProductResponse): ProductResponse {
    if (this.whishList.getValue()?.length! > 0) {
      products.data = products.data.filter((item) => {
        const filterItem = this.whishList
          .getValue()!
          .find((filter) => filter._id === item._id);

        if (filterItem) {
          item.fav = true;
          return item;
        }
        return item;
      });

      return products;
    } else {
      return products;
    }
  }
}
