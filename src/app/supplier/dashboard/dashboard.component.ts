import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class DashboardComponent implements OnInit {
    lastThreeOrders: any[] = [];
    randomRetailers: any[] = [];

    constructor(private router: Router, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getDashboardData().subscribe({
            next: (response: any) => {
                this.lastThreeOrders = response.lastThreeOrders;
                this.randomRetailers = response.randomRetailers;
                console.log('Dashboard data fetched successfully', response);
            },
            error: (err) => {
                console.error('Error fetching dashboard data:', err);
            }
        });
    }

    navigateToFinancialReport() {
        this.router.navigate(['financial-report']);
    }

    navigateToOrders(){
      this.router.navigate(['/orders']);
    }
}
