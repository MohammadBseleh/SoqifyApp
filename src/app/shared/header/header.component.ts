import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }
}
