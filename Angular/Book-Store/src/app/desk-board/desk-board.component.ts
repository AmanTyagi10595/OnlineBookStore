import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Options } from 'ng5-slider';
@Component({
  selector: 'app-desk-board',
  templateUrl: './desk-board.component.html',
  styleUrls: ['./desk-board.component.css']
})

export class DeskBoardComponent implements OnInit {
  isLogged: any;
  datas;
  minValue: number = 10;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 2000
  };
  foods = [
    {value: 'remove', viewValue: 'Remove Filter'},
    {value: 'Class-06', viewValue: 'Class-06'},
    {value: 'Class-07', viewValue: 'Class-07'},
    {value: 'Class-08', viewValue: 'Class-08'},
    {value: 'Class-09', viewValue: 'Class-09'},
    {value: 'Class-10', viewValue: 'Class-10'},
    {value: 'Class-11', viewValue: 'Class-11'},
    {value: 'Class-12', viewValue: 'Class-12'}

  ];
  class={
    className:"",
    minRange:Number=0,
    maxRange:Number=10000
  }
  constructor(private services: AuthServiceService) {

  }

  ngOnInit() {
    this.deskboardBook(this.class);
    this.isLogged = localStorage.getItem("isLogged");

  }
  deskboardBook(data) {
    this.services.deskboardBook(data).subscribe((response: any) => {
      this.datas = response.res;
    })
  }

  onSelectClass(food){
    console.log(">>>>>>>>",food.value)
    if(food.value === 'remove') {
      this.class.className = "";
      return this.deskboardBook(this.class)
    }
    this.class.className= food.value;
    this.deskboardBook(this.class);
        // this.deskboardBook(food.value);
  }
  setSlidervalue(maxValue, minValue){
    this.class.minRange = minValue;
    this.class.maxRange = maxValue;
    this.deskboardBook(this.class);
  }

}
