import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { UserApiResponse } from '../../types/users-response';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCreate } from '../../types/createUser-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users!: UserApiResponse;
  mode: string;
  toggleMode: boolean;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
  ) {
    this.mode = 'Add new';
    this.toggleMode = false;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      address: ['', Validators.required],
      userImg: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      id: [''],
    });
  };

  ngOnInit(): void {
    this.usersService.getAllusers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  };

  get fc() {
    return this.userForm.controls;
  };

  changeMode(id: string): void {
    this.mode = 'Update';
    this.toggleMode = true;
    this.usersService.getOneUser(id).subscribe({
      next: (user) => {
        if (user) {
          this.userForm = this.fb.group({
            name: [user.data.name, Validators.required],
            email: [user.data.email, [Validators.required, Validators.email]],
            phone: [
              user.data.phone,
              [Validators.required, Validators.pattern('[0-9]{11}')],
            ],
            address: [user.data.address, Validators.required],
            userImg: [''],
            password: [''],
            role: [user.data.role, Validators.required],
            id: [user.data._id],
          });
        } else {
          this.mode = 'Add new';
        }
      },
    });
  };

  cancel(): void {
    this.mode = 'Add new';
    this.toggleMode = false;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      address: ['', Validators.required],
      userImg: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      id: [''],
    });
  };

  deleteUser(id: string): void{
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.toastr.success('user deleted successfully');
        this.usersService.getAllusers().subscribe({
          next:(users)=>{
            this.users = users;
          }
        })
      }
    })
  }

  onSubmit() {
    if (this.mode == 'Add new') {
      const file = this.userForm.get('userImg')!.value;
      if (file) {
        const formData = new FormData();
        formData.append('userImg', file);
        formData.append('name', this.userForm.value.name);
        formData.append('email', this.userForm.value.email);
        formData.append('phone', this.userForm.value.phone);
        formData.append('password', this.userForm.value.password);
        formData.append('address', this.userForm.value.address);
        formData.append('role', this.userForm.value.role);
        this.usersService.addNewUser(formData).subscribe({
          next: (user) => {
            this.toastr.success('user added successfully');
            this.users.data = [...this.users.data, user.data];
          },
          error: (err: HttpErrorResponse) => {
            if (err.error.message.startsWith('E11000 ')) {
              this.toastr.error(`Email address already used`);
              return;
            }
            this.toastr.error(`${err.error.message}`);
          },
        });
      }
    } else {
      const file = this.userForm.get('userImg')!.value;
      const formData = new FormData();
      if (file) {
        formData.append('userImg', file);
        formData.append('name', this.userForm.value.name);
        formData.append('email', this.userForm.value.email);
        formData.append('phone', this.userForm.value.phone);
        formData.append('password', this.userForm.value.password);
        formData.append('address', this.userForm.value.address);
        formData.append('role', this.userForm.value.role);
      } else {
        formData.append('name', this.userForm.value.name);
        formData.append('email', this.userForm.value.email);
        formData.append('phone', this.userForm.value.phone);
        formData.append('password', this.userForm.value.password);
        formData.append('address', this.userForm.value.address);
        formData.append('role', this.userForm.value.role);
      }
      this.usersService.updateUser(formData, this.userForm.value.id).subscribe({
        next: (user) => {
          this.toggleMode = false;
          this.mode = 'Add new';
          this.cancel();
          this.toastr.success('user updated successfully');
          const index = this.users.data.findIndex(
            (obj) => obj._id === user.data._id
          );
          console.log(index);
          if (index > -1) {
            this.users.data[index] = user.data;
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.message.startsWith('E11000 ')) {
            this.toastr.error(`Email address already used`);
            return;
          }
          this.toastr.error(`${err.error.message}`);
        },
      });
    }
    this.userForm.reset();
  };
}
