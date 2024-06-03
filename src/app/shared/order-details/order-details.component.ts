import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class OrderDetailsComponent  implements OnInit {
  items !: any[]; 
  id !: number;
  date: any;
  status: any;
  loadingPresent: boolean = false;
  constructor(private loadingCtrl: LoadingController, private route: ActivatedRoute, private profileService: ProfileService) { 
    this.route.queryParams.subscribe(params => {
      this.id = JSON.parse(params['id']);
      console.log('Order ID:', this.id);
    });
  }

  ngOnInit() {
    this.showLoading();
    this.profileService.getOrderById(this.id).subscribe({
      next: (response: any) => {
        this.date = this.convertToDate(response.orderDate);
        this.status = response.status;
        this.items = response.orderItems.map((item: any) => ({
          ...item,
          total: item.pricePerUnit * item.quantity,
          randomPieces: this.getRandomPieces()
      }));
       this.dismissLoading();
        console.log('Order fetched successfully', response);
      },
      error: (err) => {
        this.dismissLoading();
        console.error('Error fetching order:', err);
      }
    })
  }

  convertToDate(dateArray: number[]): Date {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000);
  }


  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
}

getTotal(): number {
    return this.getSubtotal() + (this.getSubtotal() * 0.1); // Assuming a fixed tax of $20
}

getTax(): number{
  return this.getSubtotal() * 0.1;
}

getRandomPieces(): number {
    let num = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    console.log('Random pieces:', num);
    return num;
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
