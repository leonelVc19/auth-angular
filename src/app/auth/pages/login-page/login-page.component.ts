import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email:['jaun@gmail.com', [ Validators.required, Validators.email ]],
    password:['1234567', [ Validators.required, Validators.minLength(6) ]],
  });
  public login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ( message ) => {
          console.log(message.error.message);

          Swal.fire({
            title: "Error !",
            text: `${message.error.message}`,
            icon: "error",
            timer: 1500
          });
        }
      })
  };
}
