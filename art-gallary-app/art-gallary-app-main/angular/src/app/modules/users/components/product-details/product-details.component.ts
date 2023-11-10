import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CurentUser } from 'src/app/modules/auth/types/current-user';
import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from 'src/app/shared/types/product';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  comment!: FormGroup;
  updateComment: FormGroup;
  rating!: number;
  product!: Product;
  loggedIn: boolean;
  currentUser: CurentUser | null;
  haveReview: boolean;
  reviewId: string;
  updateMode: boolean;
  mode: string;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private productService: ProductService,
    private authService:AuthService
  ) {
    this.loggedIn = false;
    this.currentUser = null;
    this.haveReview = false;
    this.reviewId = "";
    this.rating = 0;
    this.updateMode = false;
    this.mode="Update"

    this.comment = this.fb.group({
      title: ["", Validators.required],
    });

    this.updateComment = this.fb.group({
      title: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (val) => {
        this.getOneProduct(val["id"]);

        this.productService.updateProductView(val["id"]).subscribe();
      },
    });

    this.authService.getLoggedIn().subscribe({
      next: (val:boolean) => {
        this.loggedIn = val;
      }
    });

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    })
  }

  get fc(): any {
    return this.comment.controls;
  }

  get updateCommentFc(): any {
    return this.updateComment.controls;
  }

  createComment(product:string) {
    if (this.haveReview) {
      this.updateReview(this.comment.value, product);
    }
    this.comment.reset();
  }

  rate(star: number , product:string): void {
    if (this.rating === star) {
      this.rating = 0;
    } else {
      this.rating = star;
    }

    const data: { rating: number, product: string } = { rating: this.rating, product: product };

    if (this.haveReview) {
      const updatedData = { rating: this.rating };
      this.productService.updateReview(updatedData, this.reviewId).subscribe({
        next: (review) => {
          this.getOneProduct(product);
        }
      });
      return;
    } else {
      this.productService.createReview(data).subscribe({
        next: (review) => {
          this.getOneProduct(product);
        }
      })
    }
  }

  getOneProduct(id:string): void{
    this.productService.getOneProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        if (this.product.data.reviews.length > 0) {
          this.product.data.reviews.forEach(review => {
            if (this.currentUser?.data._id === review.user._id) {
              this.rating = review.rating;
              this.haveReview = true;
              this.reviewId = review._id;
            }
          });
        }
      },
    });
  }

  updateReview(data:{title?:string , rating?:number} , product:string):void{
    this.productService.updateReview(data, this.reviewId).subscribe({
      next: (review) => {
        this.getOneProduct(product);
      }
    });
  }

  UpdateComments(product:string):void {
    this.updateReview(this.updateComment.value, product);
    this.updateMode = false;
    this.mode = "Update";
    this.updateComment.reset();
  }

  changeMode():void {
    if (this.mode==="Update") {
      this.updateMode = true;
      this.mode = "Cancel";
    } else {
      this.updateMode = false;
      this.mode = "Update";
    }


  }

  deleteComment(product:string , review:string): void{
    this.productService.deleteReview(review).subscribe({
      next: (val) => {
        this.getOneProduct(product);
        this.rating = 0;
        this.haveReview = false;
      }
    })
  }
}
