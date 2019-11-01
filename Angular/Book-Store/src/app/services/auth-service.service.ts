import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { }
  loginSubmit(obj) {
    return this.http.post(`${this.url}auth/login`, obj, httpOptions)
  }

  forgotPass(obj) {
    return this.http.put(`${this.url}resetPassword`, obj, httpOptions);
  }

  updatePassword(obj) {
    return this.http.put(`${this.url}resetPassword2`, obj, httpOptions);
  }
  deskboardBook() {
    return this.http.get(`${this.url}user/findBooks`, httpOptions);
  }
  registerUser(obj) {
    let httpOptions = new HttpHeaders({
      'Content-type': 'multipart/form-data'
    });
    const formdata = new FormData();
    formdata.append('myFile', obj.myFile);
    delete obj.myFile;
    formdata.append('data', JSON.stringify(obj))
    return this.http.post(`${this.url}auth/register`, formdata, {headers: httpOptions});
  }
  bookDetail(id) {
    return this.http.get(`${this.url}user/findParticularBooks/${id}`);
  }
  updateProfile(obj) {
    // console.log(obj,"obj in Update profile")
    let httpOptions = new HttpHeaders({
      'Content-type': 'multipart/form-data'
    });
    const formdata = new FormData();
    formdata.append('myFile', obj.myFile);
    delete obj.myFile;
    formdata.append('data', JSON.stringify(obj))
    return this.http.put(`${this.url}updateProfile`, formdata, {headers: httpOptions});
  }
  addToCartApi(obj) {
    return this.http.post(`${this.url}user/addToCart`, obj);
  }
  fetchCartBook(UserId) {
    return this.http.post(`${this.url}user/fetchCartBook`, { UserId });
  }
  removeFromCart(obj) {
    return this.http.post(`${this.url}user/removeFromCart`, obj);
  }
  fetchCartForPay(UserId) {
    return this.http.post(`${this.url}user/fetchCartBook`, { UserId });
  }
  addBook(payload, file) {
    let httpOptions = new HttpHeaders({
      'Content-type': 'multipart/form-data'
    });
    const formdata = new FormData();
    formdata.append('myFile', file);
    formdata.append('data', JSON.stringify(payload));
    return this.http.post(`${this.url}admine/addBooks`, formdata, {headers: httpOptions});
  }
  findAllBooks(obj) {
    return this.http.get(`${this.url}/admine/findBooks`, { params: { limit: obj.limit, skip: obj.skip, bookCostRange: obj.bookCostRange } });
  }
  updateBookDetails(payload, file) {
    let httpOptions = new HttpHeaders({
      'Content-type': 'multipart/form-data'
    });
    const formdata = new FormData();
    formdata.append('myFile', file);
    formdata.append('data', JSON.stringify(payload));
    return this.http.post(`${this.url}admine/upadteBooks`, formdata, {headers: httpOptions});
  }
  deleteBook(obj) {

    return this.http.delete(`${this.url}admine/deleteBook`, { params: { book_ID: obj.code } });
  }
}
