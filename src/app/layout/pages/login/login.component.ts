import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  logSub!: Subscription

  show: boolean = false

  isLogin: boolean = false

  errorMsg!: string

  constructor(private _AuthService: AuthService, private _Router: Router) { }


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)])
  })


  sendData(): void {
    // call api 
    this.isLogin = true
    this.logSub = this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['home']);
        this.isLogin = false

        localStorage.setItem('userToken', res.token)

        this._AuthService.decodeUserDAta()
      },
      error: (err) => {
        console.log(err.error.message);
        this.errorMsg = err.error.message;
        this.isLogin = false
      }
    })

  }

  ngOnDestroy(): void {
    this.logSub?.unsubscribe
  }
}
