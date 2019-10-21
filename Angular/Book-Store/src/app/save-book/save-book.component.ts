import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {
  msg: string;
  constructor(private fb: FormBuilder,
    private service: AuthServiceService) { }
  // bookInfo = new FormGroup({
  //   title: new FormControl(''),
  //   address: new FormGroup({
  //     code: new FormControl(''),
  //     genre: new FormControl('')
  //   })
  // });
  bookInfo = this.fb.group({
    title: ['', Validators.required],
    // address: this.fb.group({
    //   code: [''],
    //   genre: [''],
    // }),
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
  ngOnInit() {

  }
  onSubmit() {
    // console.log(this.bookInfo.value);
    this.service.addBook(this.bookInfo.value).subscribe((data) => {
      if (data.msg == "Book Added") {
        this.msg = data.msg;
      }
    }, (error) => {
      this.msg = error.error.msg;
      // console.log(error.error.msg, "JAIAJAJAJJAJJAJ")
    });

  }
}
