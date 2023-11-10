import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatgoryResponse } from '../../types/category-response';
import { CategoryService } from '../../service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  addCatogryForm: FormGroup;
  updateForm!: FormGroup;
  carogries!: CatgoryResponse;
  updateMode: boolean;

  constructor(
    private fb: FormBuilder,
    private catogryService: CategoryService,
    private toastr:ToastrService
  ) {
    this.addCatogryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
    });

    this.updateForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      id:[""]
    });

    this.updateMode = false;
  };

  ngOnInit(): void {
    this.catogryService.getAllCatogry().subscribe({
      next: (data) => {
        this.carogries = data;
      },
    });
  }

  get fc() {
    return this.addCatogryForm.controls;
  };

  get updateFc() {
    return this.updateForm.controls;
  };

  addCatogry() {
    this.catogryService.addCatogry(this.addCatogryForm.value).subscribe({
      next: (cat) => {
        this.carogries.data = [...this.carogries.data, cat.data];
        this.toastr.success(`${cat.data.name} added Successfully`)
      },
    });
  };

  toggleMode(id: string, name: string): void {
    this.updateMode = true;
    this.updateForm = this.fb.group({
      name: [
        name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      id:[id]
    });
  };

  cancel(): void{
    this.updateMode = false;
  }

  updateCatogry():void {
    const values = this.updateForm.value
    this.catogryService.updateCatogry(values.id, { name: values.name }).subscribe({
      next: (catogry) => {
        this.updateMode = false;
        this.carogries.data = this.carogries.data.map(cat => {
          if (cat._id == catogry.data._id) {
            return {
              name: catogry.data.name,
              _id: catogry.data._id
            };
          }
          return cat;
        });
        this.toastr.success(`catogry updated Successfully`);
      }
    })
  };

  deleteCatogry(id: string): void {
    this.catogryService.deleteCatgory(id).subscribe({
      next: () => {
        this.carogries.data = this.carogries.data.filter(
          (cat) => cat._id != id
        );
        this.toastr.success(`catogry deleted Successfully`)
      },
    });
  };
}
