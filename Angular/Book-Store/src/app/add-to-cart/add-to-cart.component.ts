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
    // this.particularBookInfo();
    this.fetchCartBook();
  }
  // particularBookInfo() {
  //   this.route.queryParamMap.subscribe((bookInfo) => {
  //     this.bookInfo = bookInfo['params'];
  //     // console.log(this.bookInfo, "data in addto cart");
  //   });

  // }

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
      let books = localStorage.getItem('cartBooks');
      if (books) {
        let booksArr = JSON.parse(books);
        let newBooks = booksArr.map(book => {
          if (book.book_code === data.book_code) {
            return { ...book, val: data.val };
          } else {
            return book;
          }
        });
        localStorage.setItem('cartBooks', JSON.stringify(newBooks));
        // console.log(newBooks);
      }
    }
  }

  decrease(id) {
    let data = this.fetchedCartBook.find(item => item._id === id);
    if (data.val == 1) {
      return;
    }
    else {
      data.val--;
      data.totalAmount = ((data.val) * (data.book_price));
      let tempData = localStorage.getItem("cartBooks");
      if (tempData) {
        let tempData2 = JSON.parse(tempData);
        let newBook = tempData2.map(book => {
          if (book.book_code === data.book_code) {
            return { ...book, val: data.val };
          } else {
            return book;
          }
        });
        localStorage.setItem('cartBooks', JSON.stringify(newBook));
        // console.log(newBook);
      }
    }
  }

  validate(e, id) {
    // e.preventDefault();
    // e.stopPropagation();
    let data = this.fetchedCartBook.find(item => item._id === id);
    console.log(e, "datatattattattattattatattatt");
    if (data.val < 0) {
      data.val = 1;
    }
    else {
      data.totalAmount = ((data.val) * (data.book_price));
    }
  }
  fetchCartBook() {
    let UserId = JSON.parse(localStorage.getItem("user"));
    this.service.fetchCartBook(UserId._id).subscribe((cartBooks) => {
      this.fetchedCartBook = cartBooks['book'].map(item => {
        return { ...item, val: 1, message: "", totalAmount: item.book_price };
      })
      localStorage.setItem('cartBooks', JSON.stringify(this.fetchedCartBook));
      console.log(this.fetchedCartBook, "data that fetched from cart");
    },
      ((error) => { console.log(error, "returned arror from Apis"); }));

  }

  remove(book_code) {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(book_code, user._id, "Remove button");
    let obj = {
      "book_code": book_code,
      "user_id": user._id
    };
    console.log(obj, "Object value");
    this.service.removeFromCart(obj).subscribe((removedBook) => {
      console.log("Book Removed from cart");
    },
      (error) => {
        console.log("Error, in book removing");
      })
  }
}
