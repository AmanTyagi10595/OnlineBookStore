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
    return this.http.post(`${this.url}auth/register`, obj, httpOptions);
  }
  bookDetail(id) {
    return this.http.get(`${this.url}user/findParticularBooks/${id}`);
  }
  updateProfile(obj) {
    return this.http.post(`${this.url}updateProfile`, obj, httpOptions);
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
  addBook(obj) {
    return this.http.post(`${this.url}admine/addBooks`, obj);
  }
}
