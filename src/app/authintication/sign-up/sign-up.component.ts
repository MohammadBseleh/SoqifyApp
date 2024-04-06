import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
})
export class SignUpComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
