import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ɵConsole } from '@angular/core';
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
  imageUrl="";
  file;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthServiceService) { }

  ngOnInit() {
    this.initializeForm();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.isForEdit = true;
        this.bookInfo.setValue({
          title: params['title'],
          code: params.code,
          genre: params.genre,
          description: params.description,
          author: params.author,
          publisher: params.publisher,
          pages: params.pages,
          myFile: "",
          buy_url: params.buy_url,
          price: params.price,
          count: params.count

        });
      }
    });
  }
  onSubmit() {
    let obj = { ...this.bookInfo.value };
    delete obj.myFile;
    if (this.isForEdit == false) {
      this.service.addBook(obj, this.file).subscribe((data) => {
        if (data['msg'] == "Book Added") {
          this.msg = "Book Added";
        }
      }, (error) => {
        this.msg = error.error.msg;
      });
    }
    if (this.isForEdit == true) {
      let obj = { ...this.bookInfo.value };
      delete obj.myFile;
      this.service.updateBookDetails(obj, this.file).subscribe((data: ISomething) => {
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
      myFile: [''],
      buy_url: [''],
      price: [''],
      count: ['']
    });
  }
  imageUpload(event){
      this.file = event.target.files[0];
  }
}
