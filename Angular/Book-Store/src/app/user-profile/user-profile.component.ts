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
  profileImageUrl:string;
  url: any;
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
      this.profileImageUrl = JSON.parse(user).profilePhotoUrl;
      console.log(this.profileImageUrl,"Image url");
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
    this.service.updateProfile(obj).subscribe((response: any) => {
      this.message = "Profile Upadetd";
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(response.msgData));
        let user = JSON.parse(localStorage.getItem('user'));
      }
      // localStorage.setItem("user", JSON.stringify(response.name));
    }, (error: any) => {
      this.message = "Somthing went wrong";
    });

  }
  onSelect(event){
    var reader = new FileReader();

    let imageFile = reader.readAsDataURL(event.target.files[0]); // read file as data url
console.log(event.target.files[0])
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      console.log(this.url);
    }

  }
}
