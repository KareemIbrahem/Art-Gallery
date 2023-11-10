import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CurentUser } from 'src/app/modules/auth/types/current-user';
import { UserService } from '../../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  imageSrc: FormGroup;
  personalForm!: FormGroup;
  passwordForm: FormGroup;
  currentUser!: Observable<CurentUser | null>;
  errMessage: string | null;
  errPassMessage: string | null;
  userImg: any;
  imageError: string | null;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {
    this.imageSrc = this.fb.group({
      userImg: ['', Validators.required],
    });

    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      address: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      oldpassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.errMessage = null;
    this.errPassMessage = null;
    this.userImg = 'assets/user.webp';
    this.userId = "";
    this.imageError = null;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUser.subscribe({
      next: (user) => {
        this.userId = user?.data._id || "";
        this.userImg = user?.data.userImg || 'assets/user.webp';
        this.personalForm = this.fb.group({
          name: [user?.data.name, Validators.required],
          phone: [
            user?.data.phone,
            [Validators.required, Validators.pattern('[0-9]{11}')],
          ],
          address: [user?.data.address, Validators.required],
        });
      },
    });
  }

  get fcImage() {
    return this.imageSrc.controls;
  }

  get fcPersonal() {
    return this.personalForm.controls;
  }

  get fcPassword() {
    return this.passwordForm.controls;
  }

  changeUserImage(): void {
    const file = this.imageSrc.get('userImg')!.value;
    if (file) {
      const formData = new FormData();
      formData.append('userImg', file);

      this.userService.updateUserImage(formData).subscribe({
        next: (user) => {
          this.imageError = null;
          this.authService.setCurrentUser(user);
          this.imageSrc.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.imageError = err.error.message;
        },
      });
    }
  }

  personalDataChange(): void {
    this.userService.updateUserData(this.personalForm.value).subscribe({
      next: (user) => {
        this.errMessage = null;
        this.authService.setCurrentUser(user);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errMessage = err.error.errors[0].msg;
      },
    });
  }

  passwordChange(): void {
    // console.log(this.passwordForm.value);
    const data = { ...this.passwordForm.value, userId: this.userId };

    this.userService.changeUserPassword(data).subscribe({
      next: (user) => {
        this.errPassMessage = null;
        this.authService.logOut();
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.errors) {
          this.errPassMessage = err.error.errors[0].msg
        } else {
          this.errPassMessage = err.error.message
        }
        console.log(err)
      }
    })
  }
}
