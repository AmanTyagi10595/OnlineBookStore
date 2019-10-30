import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  file;

  constructor(private service: AuthServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: [null],
      email: [null],
      myFile: [null],
      psw: [null]
    });
  }
  result: string
  registerFun() {
    //   this.registerForm.get('myFile').setValue(this.file)
    const  obj  = { ...this.registerForm.value };
    if(this.file) {
        obj['myFile'] = this.file;
      };
      this.service.registerUser(obj).subscribe((response: any) => {
        if (response.msg == "Already registered") {
          this.result = "Already registered";
        }
        else if (response.msg == "User registed successfully") {
          this.router.navigate(['/login']);
        }
      }
      );
  }

  fileChanged(e) {
    this.file = e.target.files[0];
 }
}
