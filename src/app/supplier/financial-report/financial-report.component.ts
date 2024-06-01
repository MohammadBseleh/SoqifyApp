import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
})
export class FinancialReportComponent implements OnInit {
  activeTab: string = 'today';
  reportData: any = {};
  animateDonut: boolean = false;

  todayData = {
    customers: 4521,
    newPercentage: 60,
    returningPercentage: 20,
    inactivePercentage: 20,
    orders: 1354,
    prePaidPercentage: 55,
    postPaidPercentage: 45,
    revenue: 7.8, // in thousands of dollars
    sales: 4.3 // in thousands of dollars
  };

  lastWeekData = {
    customers: 3240,
    newPercentage: 52,
    returningPercentage: 25,
    inactivePercentage: 23,
    orders: 1205,
    prePaidPercentage: 50,
    postPaidPercentage: 50,
    revenue: 55, // in thousands of dollars
    sales: 28.5 // in thousands of dollars
  };

  monthData = {
    customers: 13000,
    newPercentage: 45,
    returningPercentage: 30,
    inactivePercentage: 25,
    orders: 4500,
    prePaidPercentage: 60,
    postPaidPercentage: 40,
    revenue: 240, // in thousands of dollars
    sales: 135 // in thousands of dollars
  };

  constructor() {
    this.setActiveTab(this.activeTab);
  }

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    switch (tab) {
      case 'today':
        this.reportData = this.todayData;
        break;
      case 'lastWeek':
        this.reportData = this.lastWeekData;
        break;
      case 'month':
        this.reportData = this.monthData;
        break;
    }
    this.triggerAnimation();
  }

  triggerAnimation(): void {
    this.animateDonut = false;
    setTimeout(() => {
      this.animateDonut = true;
      console.log('Animation triggered');
    }, 50); // Increased timeout to ensure animation reset
  }
}
