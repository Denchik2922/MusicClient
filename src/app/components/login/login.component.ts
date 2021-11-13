import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    );

  }

  ngOnInit(): void {
  }

  login(){
    if (!this.form.valid) {
      return;
    }
    let name: any = this.form.controls['name'].value;
    let password: any = this.form.controls['password'].value;

    this.authService.login(name, password)
    .subscribe(res => {
      this.router.navigate(['/']);
    })
  }

}
