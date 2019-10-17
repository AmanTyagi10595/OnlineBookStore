import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  obj = {
    email: '',
    password: ''
  }
  isLogged: boolean = false;
  isLogged1: any;

  constructor(private service: AuthServiceService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router, ) { }

  ngOnInit() {
    this.isLogged1 = localStorage.getItem("isLogged");
  }
  result: string

  loginSubmit(obj) {
    if (obj.email == '' || obj.password == '') {
      this.result = "Both fields are reruired"
    }
    else {
      this.service.loginSubmit(obj).subscribe((response: any) => {
        if (response.auth == true) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.result = "Successfully LogedIn"
          localStorage.setItem("isLogged", 'true');
          this.sharedService.setLogged(true);
          this.router.navigate(['/deskBoard']);

        }
        else if (response == "Error on the server") {
          this.result = "server error";
        }

      },
        (err: any) => {
          console.log(err.error, "testing error");
          this.result = err.error.msg;
        }
      )
    }
  }
}
