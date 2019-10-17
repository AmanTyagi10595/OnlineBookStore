import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLogged: any;
  user;

  constructor(private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.isLoggedIn.subscribe(data => {
      if (data) {
        this.isLogged = data;
      } else {
        this.isLogged = localStorage.getItem("isLogged") == 'true' ? true : false;
      }
    });
    let user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }
  logOut() {
    this.isLogged = localStorage.clear();
    this.sharedService.setLogged(false);
    this.router.navigate(['/login']);
  }
}
