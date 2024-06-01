import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  navigateToRegister() {
    this.router.navigate(['choose-role']);
  }
  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('roleId', response.roleId.toString());
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          this.navigateBasedOnRole(response.roleId);
        },
        error: (err) => console.error('Login failed', err)
      });
    }
  }

  navigateBasedOnRole(roleId: number) {
    switch (roleId) {
      case 1:
        // Navigate to admin dashboard
        this.router.navigate(['admin']);
        break;
      case 2:
        // Navigate to user dashboard
        this.router.navigate(['supplier']);
        break;
      case 3:
        // Navigate to merchant dashboard
        this.router.navigate(['merchant']);
        break;
      default:
        // Navigate to default route or show an error
        this.router.navigate(['login']);
        break;
    }
  }
}
