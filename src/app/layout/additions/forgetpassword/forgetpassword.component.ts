import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  isCodeForm: boolean = false
  isResetForm: boolean = false

  isLoading: boolean = false

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })

  resetDataForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)])
  })

  sendEmail() {

    this.isLoading = true

    this._AuthService.sendEmailAPi(this.emailForm.value).subscribe({
      next: (res) => {
        if (res.statusMsg == "success") {
          console.log(res);
          this.isCodeForm = true;
          this.isLoading = false
        }

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false

      }
    })
  }
  sendCode() {

    this.isLoading = true

    this._AuthService.sendCodeAPi(this.codeForm.value).subscribe({
      next: (res) => {
        if (res.status == "Success") {
          console.log(res);
          this.isCodeForm = false;
          this.isResetForm = true;
          this.isLoading = false

        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false

      }
    })
  }
  resetData() {
    this.isLoading = true

    this._AuthService.resetDataApi(this.resetDataForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token)
        this._AuthService.decodeUserDAta()
        this._Router.navigate(['/login'])
        this.isLoading = false

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false

      }
    })
  }
}
