import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {
  verifyForm: FormGroup;
  errorMessage: string | null;
  resendMessage: string | null;

  constructor(private fb: FormBuilder , private authService:AuthService , private router:Router) {
    this.verifyForm = this.fb.group({
      resetCode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.errorMessage = null;
    this.resendMessage = null;
  };

  get fc() {
    return this.verifyForm.controls;
  }

  onSubmit(): void{
    console.log(this.verifyForm.value)
    this.authService.verifySignUpCode(this.verifyForm.value).subscribe({
      next: (user) => {
        this.errorMessage = null;
        this.authService.setCurrentUser(user);
        this.authService.setLoggedIn(true);
        localStorage.setItem("token", user.token);
        localStorage.removeItem("email");
        this.router.navigate([""])
        console.log(user)
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
      }
    })

  }

  resendVerifyCode(): void{
    this.authService.resendVerficationCode(localStorage.getItem("email")!).subscribe({
      next: (val) => {
        this.resendMessage = val.message;
      }
    })
  }
}
