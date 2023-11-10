import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  sginupForm: FormGroup;
  errorMessage: string | null;

  constructor(private fb: FormBuilder , private authService:AuthService , private router:Router) {
    this.sginupForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      address: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("[0-9]{11}")]]
    });
    this.errorMessage = null;
  };

  ngOnInit(): void {
    this.authService.getLoggedIn().subscribe({
      next: (value) => {
        if (value) {
          this.router.navigateByUrl("/");
        }
      },
    });
  };

  get fc() {
    return this.sginupForm.controls;
  };

  onSubmit(): void{
    console.log(this.sginupForm.value)
    this.authService.signUp(this.sginupForm.value).subscribe({
      next: (val) => {
        localStorage.setItem("email", this.sginupForm.value.email);
        this.router.navigate(["auth/verify"])
      },
      error: (err: HttpErrorResponse)=>{
        this.errorMessage = err.error.message
      }
    })
  };
}
