import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  obj = {
    email: ''
  }

  constructor(private service: AuthServiceService) { }

  ngOnInit() {
  }
  result: string

  forgotPass(obj) {
    this.service.forgotPass(obj).subscribe((response: any) => {
      if (response.msg == "mail sent") {
        this.result = "OTP sent"
      }
      if (response.msg == "somthing wrong") {
        this.result = "somthing wrong";
      }

    },
      (err: any) => {
        if (err.error.msg == "user not registered") {
          this.result = "Not registered"
        }
      }
    )


  }
}
