import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
export interface ISomething {
  msg: any;
}
@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {
  msg: any;
  bookInfo: FormGroup;
  isForEdit = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthServiceService) { }

  ngOnInit() {
    this.initializeForm();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.isForEdit = true;
      }
      this.bookInfo.setValue({
        title: params['title'],
        code: params.code,
        genre: params.genre,
        description: params.description,
        author: params.author,
        publisher: params.publisher,
        pages: params.pages,
        image_url: params.image_url,
        buy_url: params.buy_url,
        price: params.price,
        count: params.count

      });
    });
  }
  onSubmit() {
    if (this.isForEdit == false) {
      this.service.addBook(this.bookInfo.value).subscribe((data) => {
        if (data['msg'] == "Book Added") {
          this.msg = "Book Added";
        }
      }, (error) => {
        this.msg = error.error.msg;
      });
    }
    if (this.isForEdit == true) {
      this.service.updateBookDetails(this.bookInfo.value).subscribe((data: ISomething) => {
        this.msg = data.msg;
      });
    }

  }



  initializeForm() {
    this.bookInfo = this.fb.group({
      title: ['', Validators.required],
      code: [''],
      genre: [''],
      description: [''],
      author: [''],
      publisher: [''],
      pages: [''],
      image_url: [''],
      buy_url: [''],
      price: [''],
      count: ['']
    });
  }
}
