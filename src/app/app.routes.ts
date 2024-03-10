import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/authintication/login/login.component').then((m) => m.LoginComponent),
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('../app/authintication/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  }
];
