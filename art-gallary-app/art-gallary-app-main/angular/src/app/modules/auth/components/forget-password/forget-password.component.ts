import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  verifyForm: FormGroup;
  resetPasswordForm: FormGroup;
  Verified: boolean;
  VerifyMail: boolean;
  resetPass: boolean;
  meassage: string | null;
  errorMeassage: string | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgetForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
    });

    this.verifyForm = this.fb.group({
      resetCode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.resetPasswordForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });

    this.Verified = false;
    this.resetPass = false;
    this.VerifyMail = true;
    this.meassage = null;
    this.errorMeassage = null;
  }

  get fc() {
    return this.forgetForm.controls;
  }

  get verifyCodeFc() {
    return this.verifyForm.controls;
  }

  get resetPasswordFc() {
    return this.resetPasswordForm.controls;
  }

  verifyEmail() {
    this.authService.forgetPassword(this.forgetForm.value.email).subscribe({
      next: (response) => {
        localStorage.setItem("email", this.forgetForm.value.email);
        this.meassage = response.message;
        this.VerifyMail = false;
        this.Verified = true;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMeassage = err.error.message;
      },
    });
  }

  verifyCode() {
    console.log(this.verifyForm.value.resetCode);
    this.authService
      .verifyResetPasswordCode(this.verifyForm.value.resetCode)
      .subscribe({
        next: (response) => {
          this.Verified = false;
          this.VerifyMail = false;
          this.resetPass = true;
          this.meassage = response?.status!;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMeassage = err.error.message;
        },
      });
  }

  resetPassword() {
    const creditional = {
      ...this.resetPasswordForm.value,
      email: localStorage.getItem("email"),
    };
    console.log(creditional);
    this.authService.resetPassword(creditional).subscribe({
      next: (response) => {
        localStorage.removeItem("email");
        this.router.navigate(["/api/v1/auth/login"]);
      },
      error: (err: HttpErrorResponse) => {
        this.meassage = null;
        this.errorMeassage = err.error.errors[0].msg;
      },
    });
  }
}
