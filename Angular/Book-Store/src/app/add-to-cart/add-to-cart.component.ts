import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  bookInfo: any;
  cartValue: number;
  message: string;
  fetchedCartBook;

  constructor(
    private route: ActivatedRoute,
    private service: AuthServiceService
  ) {
    this.cartValue = 1;
    this.fetchedCartBook = [];
  }

  ngOnInit() {
    this.particularBookInfo();
    this.fetchCartBook();
  }
  particularBookInfo() {
    this.route.queryParamMap.subscribe((bookInfo) => {
      this.bookInfo = bookInfo['params'];
      // console.log(this.bookInfo, "data in addto cart");
    });

  }

  increase(id) {//1
    let data = this.fetchedCartBook.find(item => item._id === id);
    // console.log(data, "data")
    if (data.val >= data.book_count) {
      data.message = `${data.book_count} is the max count for this book, that you can order now`;
      alert(data.message);
      return;
    }
    else {
      data.val++;
      data.totalAmount = ((data.val) * (data.book_price));
    }
  }

  decrease(id) {
    let data = this.fetchedCartBook.find(item => item._id === id);
    if (data.val == 1) {
      return;
    }
    data.val--;
    data.totalAmount = ((data.val) * (data.book_price));
  }

  validate(e) {
    // e.preventDefault();
    // e.stopPropagation();
    console.log(e, "datatattattattattattatattatt");
    // return false;
    if (this.cartValue < 1) {
      this.cartValue = 1;
    }
    else {

    }
  }
  fetchCartBook() {
    let UserId = JSON.parse(localStorage.getItem("user"));
    this.service.fetchCartBook(UserId._id).subscribe((cartBooks) => {
      this.fetchedCartBook = cartBooks['book'].map(item => {
        return { ...item, val: 1, message: "", totalAmount: item.book_price };
      })
      console.log(this.fetchedCartBook, "data that fetched from cart");
    },
      ((error) => { console.log(error, "returned arror from Apis"); }));

  }
}
