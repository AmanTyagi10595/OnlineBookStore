import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-practic-forms",
  templateUrl: "./practic-forms.component.html",
  styleUrls: ["./practic-forms.component.css"]
})
export class PracticFormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
  // name = new FormControl("");
  profileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("")
  });
  updateName(name) {
    this.name.setValue("TestName");
  }
  onSubmit() {
    console.log(this.profileForm2.value);
  }
  profileForm2 = this.fb.group({
    firstName: [
      "",
      Validators.compose([Validators.required, Validators.minLength(3)])
    ],
    lastName: [""]
  });
}
