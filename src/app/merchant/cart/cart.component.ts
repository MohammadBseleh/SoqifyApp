import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class CartComponent  implements OnInit {
  items !: any[]; 
  loadingPresent: boolean = false;
  constructor(private cartService: CartService, private loadingCtrl: LoadingController, private toastController: ToastController) {
    this.showLoading();
     cartService.getCartItems().subscribe({
      next: (response: any[]) => {
        this.items = response.map(item => ({
          ...item,
          randomPieces: this.getRandomPieces()
      }));
       this.dismissLoading();
        console.log('Products fetched successfully', response);
      },
      error: (err) => {
        this.dismissLoading();
        console.error('Error fetching products:', err);
      }
     })
   }

  ngOnInit() {

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
    return Math.floor(Math.random() * (6 - 3 + 1)) + 3;
}

remove(id : number){
  this.showLoading();
  this.cartService.deleteCartItem(id).subscribe({
    next: (response: any) => {
      this.items = this.items.filter(item => item.cartItemId !== id);
      this.presentToast('Item deleted successfully', 'success');
      this.dismissLoading();
      console.log('Item deleted successfully', response);
    },
    error: (err) => {
      this.presentToast('Failed to delete item', 'danger');
      this.dismissLoading();
      console.error('Error deleting item:', err);
    }
  
  });

}

async presentToast(message: string, color: 'success' | 'danger') {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    color: color,
    position: 'top',
    cssClass: 'custom-toast',
  });
  toast.present();
}

checkOut(){
  this.showLoading();
  this.cartService.ConvertToOrder().subscribe({
    next: (response: any) => {
      this.items.map( item => {
        this.remove(item.cartItemId);
      });
      this.items = [];
      this.presentToast('Order created successfully', 'success');
      console.log('Order created successfully', response);
      this.dismissLoading();
    },
    error: (err) => {
      this.presentToast('Failed to create order', 'danger');
      console.error('Error creating order:', err);
      this.dismissLoading();
    }
  });
}

}
