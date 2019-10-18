import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UpdateStorageService } from '../services/update-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  profileForm: FormGroup;
  message: string = "";
  constructor(
    private fb: FormBuilder,
    private service: AuthServiceService,
    private update: UpdateStorageService
  ) { }

  ngOnInit() {
    this.initializeForm()
    this.userDetail();
  }
  userDetail() {
    let user = localStorage.getItem('user');
    if (user) {
      this.userInfo = JSON.parse(user);
      this.profileForm.patchValue({
        name: this.userInfo.name,
        email: this.userInfo.emailId,
        phone: this.userInfo.phone
      })
    }
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      name: [null],
      phone: [null],
      address: [null],
      email: [null]
    });
  }
  updateProfile(obj) {
    // console.log(obj, "Function called on submit");
    this.service.updateProfile(obj).subscribe((response: any) => {
      this.message = "Profile Upadetd";
      console.log("response after update profile", response.msgData);
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(response.msgData));
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("Updated Local storage:", user);
      }
      // localStorage.setItem("user", JSON.stringify(response.name));
    }, (error: any) => {
      console.log(error, "error in db");
      this.message = "Somthing went wrong";
    });

  }
}
