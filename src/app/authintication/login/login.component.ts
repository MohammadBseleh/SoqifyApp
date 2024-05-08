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
        next: (response) => this.navigateToMerchant(),
        error: (err) => console.error('Login failed', err)
      });
    }
  }

  navigateToMerchant() {
    this.router.navigate(['merchant']);
  }
}
