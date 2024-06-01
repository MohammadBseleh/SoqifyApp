import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ActiveIconService } from '../services/active-icon.service';
import { Role } from 'src/app/authintication/models/auth';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class FooterComponent implements OnInit {
  role: number = +(localStorage.getItem('roleId') ?? 0);

  constructor(
    private router: Router,
    private activeIconService: ActiveIconService
  ) {
    if (this.role === 2) {
      this.activeIconService.setActiveIcon('dashboard');
    }else{
      this.activeIconService.setActiveIcon('home');
    }
  }

  ngOnInit() {}
  activeIcon = this.activeIconService.getActiveIcon();

  setActiveIcon(iconName: string) {
    this.activeIconService.setActiveIcon(iconName);
    console.log(this.activeIconService.getActiveIcon());
  }

  onIconClick(iconName: string) {
    this.navigateToPage(iconName);
    this.setActiveIcon(iconName);
  }
  navigateToPage(iconName: string) {
    if (iconName === 'orders') {
      this.router.navigate(['/orders']);
    }
    if (iconName === 'profile') {
      this.router.navigate(['/profile']);
    }
    if (iconName === 'suppliers') {
      this.router.navigate(['/find-supplier']);
    }
    if (iconName === 'home') {
      this.router.navigate(['/merchant']);
    }
    if (iconName === 'chat') {
      this.router.navigate(['/chat']);
    }
    if (iconName === 'add-product') {
      this.router.navigate(['/add-product']);
    }
    if (iconName === 'dashboard') {
      this.router.navigate(['/supplier']);
    }
  }
}
