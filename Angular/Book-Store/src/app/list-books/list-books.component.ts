import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  listBooks: any;
  constructor(private service: AuthServiceService,
    private router: Router) { }

  ngOnInit() {
    this.findAllBooks();
  }
  findAllBooks() {
    this.service.findAllBooks().subscribe((data) => {
      this.listBooks = data;
    });
  }
  onClickEdit(book) {
    this.router.navigate(['/saveBook', book._id], { queryParams: book, skipLocationChange: true });
  }
  onClickDelete(book) {
    this.service.deleteBook(book).subscribe((data) => {
      console.log(data.msg);
    })
  }
}
