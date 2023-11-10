import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.authService.getLoggedIn().subscribe({
      next: (value) => {
        if (value) {
          this.router.navigateByUrl("/");
        }
      },
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.errorMessage = null;
        this.authService.setCurrentUser(user);
        this.authService.setLoggedIn(true);
        localStorage.setItem('token', user.token);
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
