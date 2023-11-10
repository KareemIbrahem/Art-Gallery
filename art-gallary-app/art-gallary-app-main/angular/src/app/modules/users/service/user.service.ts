import { Injectable } from "@angular/core";
import { UserData } from "../types/user-data";
import { CurentUser } from "../../auth/types/current-user";
import { Observable } from "rxjs";
import { environments } from "src/environment/environment";
import { HttpClient } from "@angular/common/http";
import { UserPassword } from "../types/user-password";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserData(data: Partial<UserData>): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/users/updateloggeduser`;
    return this.http.patch<CurentUser>(url, data);
  }

  updateUserImage(image: FormData): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/users/updateloggeduser`;
    return this.http.patch<CurentUser>(url, image);
  }

  changeUserPassword(data: UserPassword): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/users/updateloggeduserpassword`;
    return this.http.patch<CurentUser>(url, data);
  }
}
