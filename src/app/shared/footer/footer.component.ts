import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ActiveIconService } from '../services/active-icon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class FooterComponent  implements OnInit {

  constructor(private router: Router, private activeIconService: ActiveIconService) { }

  ngOnInit() {}
  activeIcon = this.activeIconService.getActiveIcon();

  setActiveIcon(iconName: string) {
    this.activeIconService.setActiveIcon(iconName);
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
  }

}
