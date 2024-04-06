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
  },
  {
    path: 'choose-role',
    loadComponent: () => import('../app/authintication/choose-role/choose-role.component').then((m) => m.ChooseRoleComponent),
  },
  {
    path: 'merchant',
    loadComponent: () => import('../app/merchant/home/home.component').then((m) => m.HomeComponent),

  },
  {
    path: 'orders',
    loadComponent: () => import('../app/shared/order/order.component').then((m) => m.OrderComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('../app/shared/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'notifications',
    loadComponent: () => import('../app/shared/notifications/notifications.component').then((m) => m.NotificationsComponent),
  },
  {
    path: 'chat',
    loadComponent: () => import('../app/shared/chat/chat.component').then((m) => m.ChatComponent),
  }
];
