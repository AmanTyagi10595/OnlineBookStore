import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"]
})
export class TemplateFormComponent implements OnInit {
  firstname = "Pascal";
  lastname = "Precht";
  city = "delhi";
  street = "A12";
  zip = "223";  
  constructor() {}
  ngOnInit() {}

  logForm(formValue: any) {
    console.log(formValue);
  }
}
