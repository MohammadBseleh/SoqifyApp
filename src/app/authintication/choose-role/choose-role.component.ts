import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ChooseRoleComponent  implements OnInit {
  role : Role = Role.MERCHANT;
  isMerchant: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToSignUp() {
    this.router.navigate(['sign-up'], { queryParams: { role: this.role } });
  }
  changeRole(role : string) {
    
    if( role === 'merchant') {
      this.role = Role.MERCHANT;
      this.isMerchant = true;
    } else {
      this.role = Role.SUPPLIER;
      this.isMerchant = false;
    }
    console.log(this.role);
  }
}
