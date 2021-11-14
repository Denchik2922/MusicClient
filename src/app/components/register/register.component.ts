import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/ConfirmValidator';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
            validator: MustMatch('password', 'confirmPassword')
        }
    );

  }

  get username() { return this.form.get('username'); }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  get confirmPassword() { return this.form.get('confirmPassword'); }

  ngOnInit(): void {
  }

  register(): void{
    if(!this.form.valid){
      return;
    } 

    let register: RegisterModel = {
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      confirmPassword: this.confirmPassword?.value
    };

    this.authService.register(register)
    .subscribe(res => {
      this.router.navigate(['/login']);
    }, error => {
      alert(error);
    })

  }

}
