import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class SignUpComponent  implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  role : Role = Role.MERCHANT;
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.role = params['role'] || Role.MERCHANT; });
    this.signupForm = this.fb.group({
      storeName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleId: [Role.MERCHANT]
    });
   }

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['']);
  }
  
  onSubmit() {
    if (this.signupForm.valid) {
      let loginRequest = { 
        name: this.signupForm.value.name,
        password: this.signupForm.value.password
      }
      this.auth.registerUser(this.signupForm.value).subscribe({
        next: (response) => this.auth.login(loginRequest),
        error: (err) => console.error('Signup failed', err)
      });
    }
  }

}
