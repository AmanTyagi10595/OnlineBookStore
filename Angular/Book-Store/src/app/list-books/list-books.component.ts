import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  listBooks: any;
  count: number;
  limit: number;
  indexStart = 1;
  filterString: string;
  sliderActive = false;
  // formatLabel = "Select Cost range of book";
  // costLimit = 500;
  obj = {
    "limit": 11,
    "skip": 0,
    "bookCostRange": 10000
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AuthServiceService,
    private router: Router) { }

  ngOnInit() {
    this.findAllBooks();
  }
  findAllBooks() {
    this.obj = {
      "limit": 7,
      "skip": 0,
      "bookCostRange": this.obj.bookCostRange
    };
    this.getBooks(this.obj);
  }
  onClickEdit(book) {
    console.log("edit button is clicked for :", book)
    this.router.navigate(['/saveBook', book._id], { queryParams: book, skipLocationChange: true });
  }
  onClickDelete(book) {
    this.service.deleteBook(book).subscribe((data) => {
      console.log(data['msg']);
      if (data['msg'] == "Book Removed") {
        this.ngOnInit();
      }
    });
  }
  onClickPaginator(event) {
    // console.log(event);
    this.obj = {
      "limit": event.pageSize,
      "skip": (event.pageIndex) * (event.pageSize),
      "bookCostRange": this.obj.bookCostRange
    };
    this.indexStart = (((event.pageIndex) * (event.pageSize)) + 1);
    this.getBooks(this.obj);
  }

  getBooks(obj) {
    this.service.findAllBooks(obj).subscribe((data) => {
      this.listBooks = data['result'];
      this.count = data['count']
    });
  }
  onSliderValueChange(event) {
    this.sliderActive = true;
    this.obj.bookCostRange = event.value;
    this.getBooks(this.obj);
  }
}
