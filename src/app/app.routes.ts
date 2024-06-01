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
  },
  {
    path: 'conversation',
    loadComponent: () => import('../app/shared/conversation/conversation.component').then((m) => m.ConversationComponent),
  },
  {
    path: 'find-supplier',
    loadComponent: () => import('./merchant/find-supplier/find-supplier.page').then( m => m.FindSupplierPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./merchant/products/products.component').then( m => m.ProductsComponent)
  },
  {
    path: 'supplier',
    loadComponent: () => import('./supplier/dashboard/dashboard.component').then( m => m.DashboardComponent)
  },
  {
    path: 'add-product',
    loadComponent: () => import('./supplier/add-product/add-product.component').then( m => m.AddProductComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./merchant/cart/cart.component').then( m => m.CartComponent)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./shared/edit-profile/edit-profile.component').then( m => m.EditProfileComponent)
  },
  {
    path: 'financial-report',
    loadComponent: () => import('./supplier/financial-report/financial-report.component').then( m => m.FinancialReportComponent)
  }
];
