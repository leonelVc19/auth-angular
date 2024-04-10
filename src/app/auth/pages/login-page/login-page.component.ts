import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService )

  public myForm: FormGroup = this.fb.group({
    email:['', [ Validators.required, Validators.email ]],
    password:['', [ Validators.required, Validators.minLength(6) ]],
  });
  public login() {
    const { email, passord } = this.myForm.value;
    console.log(this.myForm.value);
    this.authService.login(email, passord)
      .subscribe( success => {
        console.log(success);
      })
  };
}
