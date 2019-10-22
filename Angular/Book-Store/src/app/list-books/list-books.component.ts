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
  limit: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AuthServiceService,
    private router: Router) { }

  ngOnInit() {
    this.findAllBooks();
  }
  findAllBooks() {
    obj: {
      limit: 10;
    }
    console.log(obj, "object in com.ts");
    this.service.findAllBooks(obj).subscribe((data) => {
      this.listBooks = data;
    });
  }
  onClickEdit(book) {
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
    console.log(event, "data of event");
    this.limit = event.pageSize;
    this.service.findAllBooks();
  }
}
