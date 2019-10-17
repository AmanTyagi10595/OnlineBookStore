import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css']
})
export class UpdatePassComponent implements OnInit {
  result: string
  email: string;
  otp: String;
  obj = {
    password: '',
    confirmPass: ''
  }
  constructor(private services: AuthServiceService, private route: ActivatedRoute, private router: Router) {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.otp = this.route.snapshot.queryParamMap.get('otp');
  }

  ngOnInit() {
  }

  updatePass(obj) {
    var formdata = {
      OTP: this.otp,
      email: this.email,
      password: this.obj.password
    }

    console.log(formdata, "formdata")
    this.services.updatePassword(formdata).subscribe((response: any) => {
      console.log(formdata, "Start working here")
      if (response.msg == "Password Updated") {
        this.result = "Password Updated"
      }
      if (response.msg == "OTP expire") {
        this.result = "OTP expire"
      }
      if (response.msg == "wrong OTP/Email") {
        this.result = "wrong OTP/Email"
      }
    })
  }
}
