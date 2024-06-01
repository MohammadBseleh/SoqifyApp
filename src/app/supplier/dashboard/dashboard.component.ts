import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent]
})
export class DashboardComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToFinancialReport() {
    this.router.navigate(['financial-report']);
  }

}
