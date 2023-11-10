import { Component, OnInit } from "@angular/core";
import { CatgoryResponse } from "../../types/category-response";
import { CategoryService } from "../../service/category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "src/app/shared/service/product.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.scss"],
})
export class SingleProductComponent implements OnInit {
  catogry!: CatgoryResponse;
  productForm: FormGroup;
  imgSrc: string | null;
  mode: string;
  docId: string;

  constructor(
    private catogryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.imgSrc = null;
    this.mode = "Add new";
    this.docId = "";
    this.productForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(300),
        ],
      ],
      price: ["", Validators.required],
      stock: ["", Validators.required],
      category: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.catogryService.getAllCatogry().subscribe({
      next: (cat) => {
        this.catogry = cat;
      },
    });

    this.activatedRouter.queryParams.subscribe({
      next: (val) => {
        if (val["id"]) {
          this.mode = "Update";
          this.docId = val["id"];
          this.productService.getOneProduct(val["id"]).subscribe({
            next: (product) => {
              if (product) {
                this.imgSrc = product.data.image;
                console.log(this.imgSrc);

                this.productForm = this.fb.group({
                  name: [
                    product.data.name,
                    [
                      Validators.required,
                      Validators.minLength(4),
                      Validators.maxLength(30),
                    ],
                  ],
                  description: [
                    product.data.description,
                    [
                      Validators.required,
                      Validators.minLength(50),
                      Validators.maxLength(300),
                    ],
                  ],
                  price: [product.data.price, Validators.required],
                  stock: [product.data.stock, Validators.required],
                  category: [product.data.category, Validators.required],
                  image: ["", Validators.required],
                });
              }
            },
          });
        } else {
          this.mode = "Add new";
        }
      },
    });
  }

  get fc() {
    return this.productForm.controls;
  }

  onSubmit() {
    const file = this.productForm.get("image")!.value;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", this.productForm.value.name);
      formData.append("description", this.productForm.value.description);
      formData.append("price", this.productForm.value.price);
      formData.append("stock", this.productForm.value.stock);
      formData.append("category", this.productForm.value.category);
      if (this.mode == "Add new") {
        this.productService.addProduct(formData).subscribe({
          next: (product) => {
            this.toastr.success("product added Successfully");
            this.router.navigate(["/"]);
          },
        });
      } else {
        this.productService.updateProduct(formData, this.docId).subscribe({
          next: (product) => {
            this.toastr.success("product updated Successfully");
            this.router.navigate(["/"]);
          },
        });
      }
    }
  }
}
