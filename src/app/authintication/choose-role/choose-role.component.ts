import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss'],
  standalone: true,
})
export class ChooseRoleComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }
}
