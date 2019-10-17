import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-desk-board',
  templateUrl: './desk-board.component.html',
  styleUrls: ['./desk-board.component.css']
})

export class DeskBoardComponent implements OnInit {
  isLogged: any;
  datas;
  constructor(private services: AuthServiceService) {

  }

  ngOnInit() {
    this.deskboardBook();
    this.isLogged = localStorage.getItem("isLogged");

  }
  deskboardBook() {

    this.services.deskboardBook().subscribe((response: any) => {
      this.datas = response.res;
      // console.log(response.res.length, "length of array");
    })
  }
}
