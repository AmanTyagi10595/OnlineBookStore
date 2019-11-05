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
  message:string="";
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
    });
  }
  addToCartApi(book) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let dataToSend = {
        "book": {
           "count": book.count,
           "price": book.price,
           "code": book.code,
           "title": book.title,
           "_id":book._id
         },
         "user": {
           "_id":user._id,
         "emailId":user.emailId
       }
       };
      this.service.addToCartApi(dataToSend).subscribe((data) => {
        this.router.navigate(['/addToCart']);
      }, (error) => {
        console.log("error-->", error.error['msg'])
this.message ="Book already in Your cart";
      });
    }
    else{
      console.log("loging please");
      this.message ="login please";

    }
  }
}
