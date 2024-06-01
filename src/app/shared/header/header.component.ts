import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent  implements OnInit {
  role: number = +(localStorage.getItem('roleId') ?? 0);

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
