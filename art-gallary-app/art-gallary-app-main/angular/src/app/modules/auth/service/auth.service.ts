import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../types/login-request";
import { environments } from "src/environment/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { CurentUser } from "../types/current-user";
import { SignUpRequest } from "../types/signup-request";
import { SignUpFirstResponse } from "../types/signupFirst-response";
import { VerifyCode } from "../types/verify-code";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser = new BehaviorSubject<CurentUser | null>(null);
  private isLoggedIn: BehaviorSubject<boolean>;
  private isAdmin!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = new BehaviorSubject(true);
    } else {
      this.isLoggedIn = new BehaviorSubject(false);
    }
  }

  setCurrentUser(user: CurentUser): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<CurentUser | null> {
    return this.currentUser.asObservable();
  }

  setIsAdmin(value: boolean): void {
    this.isAdmin.next(value);
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  getLoggedUser(): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/users/getloggeduser`;
    return this.http.get<CurentUser>(url);
  }

  setLoggedIn(status: boolean): void {
    this.isLoggedIn.next(status);
  }

  getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  login(data: LoginRequest): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/auth/login`;
    return this.http.post<CurentUser>(url, data);
  }

  logOut(): void {
    localStorage.removeItem("token");
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
    this.router.navigate([""]);
  }

  signUp(user: SignUpRequest): Observable<SignUpFirstResponse> {
    const url = `${environments.apiUrl}/api/v1/auth/signup`;
    return this.http.post<SignUpFirstResponse>(url, user);
  }

  verifySignUpCode(code: VerifyCode): Observable<CurentUser> {
    const url = `${environments.apiUrl}/api/v1/auth/signup/verify`;
    return this.http.post<CurentUser>(url, code);
  }

  resendVerficationCode(email: string): Observable<SignUpFirstResponse> {
    const url = `${environments.apiUrl}/api/v1/auth/signup/resend`;
    return this.http.post<SignUpFirstResponse>(url, { email });
  }

  forgetPassword(email: string): Observable<SignUpFirstResponse> {
    const url = `${environments.apiUrl}/api/v1/auth/forgetPassword`;
    return this.http.post<SignUpFirstResponse>(url, { email });
  }

  verifyResetPasswordCode(
    resetCode: string
  ): Observable<Partial<SignUpFirstResponse>> {
    const url = `${environments.apiUrl}/api/v1/auth/verifyResetCode`;
    return this.http.post(url, { resetCode });
  }

  resetPassword(creditional: {
    password: string;
    confirmPassword: string;
    email: string;
  }): Observable<Partial<SignUpFirstResponse>> {
    const url = `${environments.apiUrl}/api/v1/auth/resetPassword`;
    return this.http.post(url, creditional);
  }
}
