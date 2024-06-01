import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/home';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: any;
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  quantity: number = 0;
  showError: boolean = false;
  loadingPresent: any;

  constructor(
    private cartService: CartService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    console.log('Product details:', this.product);
  }

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index === -1) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors.splice(index, 1);
    }
  }

  toggleSize(size: string) {
    const index = this.selectedSizes.indexOf(size);
    if (index === -1) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes.splice(index, 1);
    }
  }

  validateSelection() {
    this.showError = false;

    if (this.selectedColors.length === 0) {
      this.showError = true;
    }
    if (this.selectedSizes.length === 0) {
      this.showError = true;
    }
    if (this.quantity <= 0) {
      this.showError = true;
    }

    if (!this.showError) {
      this.addToCart();
    }
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

  addToCart() {
    console.log('Product added to cart:', {
      product: this.product,
      selectedColors: this.selectedColors,
      selectedSizes: this.selectedSizes,
      quantity: this.quantity,
    });
    let cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
      selectedColors: this.selectedColors,
      selectedSizes: this.selectedSizes,
    };
    this.cartService.addCartItem(cartItem).subscribe({
      next: (response) => {
        console.log('Cart item added successfully:', response);
        this.presentToast('Product added to cart', 'success');
      },
      error: (err) => {
        console.error('Error adding cart item:', err);
        this.presentToast('Failed to add product to cart', 'danger');
      },
    });
  }
}
