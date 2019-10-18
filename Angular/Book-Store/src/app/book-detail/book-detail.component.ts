import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookInfo: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: AuthServiceService) { }

  ngOnInit() {
    this.bookDetail();
  }
  bookDetail(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.service.bookDetail(id).subscribe((bookdetail) => {
      this.bookInfo = bookdetail;
      console.log(this.bookInfo, "Book Info");
    });
  }
  addToCartApi(book) {
    let user = JSON.parse(localStorage.getItem("user"));
    let dataToSend = {
      "book": book,
      "user": user
    };
    if (user) {
      // console.log(dataToSend, "data sending to Backend Apis");
      this.service.addToCartApi(dataToSend).subscribe((data) => {
        console.log("Book added in the cart", data);
        this.router.navigate(['/addToCart']);
      }, (error) => {
        console.log("Cart could not be updated", error);
      });
    }
  }
}
