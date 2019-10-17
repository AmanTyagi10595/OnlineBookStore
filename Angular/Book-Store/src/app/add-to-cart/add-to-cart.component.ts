import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  bookInfo: any;
  cartValue: number;
  message: string;

  constructor(
    private route: ActivatedRoute) {
    this.cartValue = 1;
  }

  ngOnInit() {
    this.particularBookInfo();
  }
  particularBookInfo() {
    this.route.queryParamMap.subscribe((bookInfo) => {
      this.bookInfo = bookInfo['params'];
      console.log(this.bookInfo, "data in addto cart");
    });

  }

  increase() {
    if (this.cartValue >= this.bookInfo.count) {
      this.message = `${this.cartValue} is the max count, that you can order now`;
      return;
    }
    else {
      this.cartValue++;
    }
  }

  decrease() {
    if (this.cartValue <= 1) return;
    this.cartValue--;
    this.message = "";
  }

  validate() {
    if (this.cartValue < 1) {
      this.cartValue = 1;
    }
  }
}
