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
  emailBlur: boolean = false;
  passBlur: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
  // name = new FormControl("");
  profileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("")
  });
  updateName(name) {
    // this.name.setValue("TestName");
  }
  onSubmit() {
    // console.log(this.profileForm2.value);
    console.log("testing controls", this.profileForm2.controls);
  }

  profileForm2 = this.fb.group({
    firstName2: [
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5)
      ])
    ],
    lastName2: ["", Validators.required],
    email2: ["", Validators.email],
    password2: [
      "",
      Validators.pattern(
        "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{4,}"
      )
    ]
  });

  onFocusOut(data) {
    console.log("++_+_+", data);
    if (data == "emailBlur") {
      this.emailBlur = true;
    } else if (data == "passBlur");
    {
      this.passBlur = true;
    }
  }
  // f() {
  //   return this.profileForm2.controls;
  // }
}
