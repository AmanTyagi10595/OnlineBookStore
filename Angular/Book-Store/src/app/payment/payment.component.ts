import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "../services/auth-service.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  booksInCart;
  noOfBooks = 0;
  total = 0;
  constructor(private service: AuthServiceService) {}

  ngOnInit() {
    this.fetchCartBook();
  }
  fetchCartBook() {
    let books = JSON.parse(localStorage.getItem("cartBooks"));
    if (books) {
      this.booksInCart = books;
      books.forEach(r => {
        this.total = this.total + r.book_price * r.val;
        this.noOfBooks = this.noOfBooks + 1;
      });
    }
  }
}
