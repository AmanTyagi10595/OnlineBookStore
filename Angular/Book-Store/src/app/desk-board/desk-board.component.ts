import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "../services/auth-service.service";
import { Options } from "ng5-slider";
@Component({
  selector: "app-desk-board",
  templateUrl: "./desk-board.component.html",
  styleUrls: ["./desk-board.component.css"]
})
export class DeskBoardComponent implements OnInit {
  isLogged: any;
  datas;
  limit = 10;
  numberOfPages = [];
  minValue = 10;
  maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 2000
  };
  foods = [
    { value: "remove", viewValue: "Remove Filter" },
    { value: "Class-06", viewValue: "Class-06" },
    { value: "Class-07", viewValue: "Class-07" },
    { value: "Class-08", viewValue: "Class-08" },
    { value: "Class-09", viewValue: "Class-09" },
    { value: "Class-10", viewValue: "Class-10" },
    { value: "Class-11", viewValue: "Class-11" },
    { value: "Class-12", viewValue: "Class-12" }
  ];
  obj = {
    className: "",
    minRange: 0,
    maxRange: 10000,
    limit: this.limit,
    skip: 0
  };
  constructor(private services: AuthServiceService) {}

  ngOnInit() {
    this.deskboardBook(this.obj);
    this.isLogged = localStorage.getItem("isLogged");
  }
  deskboardBook(data) {
    this.services.deskboardBook(data).subscribe((response: any) => {
      this.numberOfPages = new Array(Math.ceil(response.count / this.limit));
      this.datas = response.result;
    });
  }

  onSelectClass(food) {
    console.log(">>>>>>>>", food.value);
    if (food.value === "remove") {
      this.obj.className = "";
      return this.deskboardBook(this.obj);
    }
    this.obj.className = food.value;
    this.deskboardBook(this.obj);
  }
  setSlidervalue(maxValue, minValue) {
    this.obj.minRange = minValue;
    this.obj.maxRange = maxValue;
    this.deskboardBook(this.obj);
  }
  onPaginatorClick(page) {
    console.log(page);
    if (page === "previous") {
      this.obj.skip = this.obj.skip - this.limit;
      this.deskboardBook(this.obj);
    } else if (page === "next") {
      this.obj.skip = this.obj.skip + this.limit;
      this.deskboardBook(this.obj);
    } else {
      this.obj.skip = page * this.limit;
      this.deskboardBook(this.obj);
    }
  }
}
