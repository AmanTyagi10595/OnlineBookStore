import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  obj = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private service: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  result: string
  registerFun(obj) {
    if (obj.email == '' || obj.password == '' || obj.name == '') {
      this.result = "All fields are reruired";
    }
    else {
      this.service.registerUser(obj).subscribe((response: any) => {
        if (response.msg == "Already registered") {
          this.result = "Already registered";
        }
        else if (response.msg == "User registed successfully") {
          this.result = "Successfully Registered";
        }
      }
      );

    }

  }
}
