import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    standalone: true,
    imports: [FooterComponent, HeaderComponent, CommonModule]
})
export class OrderComponent  implements OnInit {
  orders: any[] = [];
  loadingPresent: boolean = false;
  constructor(private profileService: ProfileService, private router:Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showLoading();
    this.profileService.getAllOrders().subscribe({
      next: (response: any[]) => {
        this.orders = response;
        this.dismissLoading();
        console.log('Orders fetched successfully', response);
      },
      error: (err) => {
        this.dismissLoading();
        console.error('Error fetching orders:', err);
      }
    })
  }

  viewDetails(orderId : number){
    this.router.navigate(['/order-details'], { queryParams: { id: orderId } });
    console.log('View order details');
  }

  async showLoading() {
    if (!this.loadingPresent) {
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Loading',
        });
        await loading.present();
        this.loadingPresent = true;
        console.log('Loading presented');
      } catch (error) {
        console.error('Error presenting loading:', error);
      }
    }
  }
  
  async dismissLoading() {
    if (this.loadingPresent) {
      try {
        const loading = await this.loadingCtrl.getTop();
        if (loading) {
          await loading.dismiss();
          this.loadingPresent = false;
          console.log('Loading dismissed');
        }
      } catch (error) {
        console.error('Error dismissing loading:', error);
      }
    }
  }

}
