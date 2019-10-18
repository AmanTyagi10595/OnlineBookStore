import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  booksInCart;
  total = 0;
  constructor(private service: AuthServiceService) { }

  ngOnInit() {
    this.fetchCartBook();
  }
  fetchCartBook() {
    let books = JSON.parse(localStorage.getItem("cartBooks"));
    if (books) {
      this.booksInCart = books;
      // console.log(this.booksInCart, "data in the payment component");
      books.forEach(r => {
        this.total = this.total + (r.book_price * r.val);
        // console.log(this.total, r.book_price, r.val, "working");
      });


    }
  }
}
