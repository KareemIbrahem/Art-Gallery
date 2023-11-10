import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent {
  @Input() rating!: number;

  constructor(){}

  getStarArray(): number[] {
    const starCount = 5;
    const integerPart = Math.floor(this.rating);
    const decimalPart = this.rating - integerPart;
    let stars: number[] = [];
  
    for (let i = 0; i < integerPart; i++) {
      stars.push(i + 1);
    }
  
    if (decimalPart >= 0.5) {
      stars.push(integerPart + 1);
    }
  
    while (stars.length < starCount) {
      stars.push(0);
    }
  
    return stars;
  }
}
