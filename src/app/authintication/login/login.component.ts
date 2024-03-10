import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LoginComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToRegister() {
    this.router.navigate(['sign-up']);
  }
}
