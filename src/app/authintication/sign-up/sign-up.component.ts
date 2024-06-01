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
export class SignUpComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  role!: Role;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    // Parse the role from query parameters
    this.route.queryParams.subscribe(queryParams => {
      const roleParam = Number(queryParams['role']);
      if (Object.values(Role).includes(roleParam)) {
        this.role = roleParam;
        console.log('Role:', this.role);
        this.signupForm.patchValue({ roleId: this.role }); // Update the form control with the parsed role
      } else {
        console.error('Invalid role parameter');
      }
    });

    // Initialize the form with the parsed role
    this.signupForm = this.fb.group({
      storeName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleId: [this.role]
    });
  }

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.registerUser(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('roleId', response.roleId.toString());
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          this.navigateBasedOnRole(response.roleId);
        },
        error: (err) => console.error('Signup failed', err)
      });
    }
  }

  navigateBasedOnRole(roleId: number) {
    switch (roleId) {
      case Role.MERCHANT:
        this.router.navigate(['merchant']);
        break;
      case Role.SUPPLIER:
        this.router.navigate(['supplier']);
        break;
      default:
        this.router.navigate(['login']);
        break;
    }
  }
}
