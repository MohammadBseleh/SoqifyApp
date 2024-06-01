import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home.service';
import { Product } from '../models/home';
import { LoadingController } from '@ionic/angular';

addIcons({
  'chevron-back': chevronBack,
});

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [IonIcon, FooterComponent, HeaderComponent, ProductDetailsComponent, CommonModule],
})
export class ProductsComponent implements OnInit {
  showProductDetails = false;
  products: Product[] = [];
  selectedProduct: any;
  categoryName: string = '';
  loadingPresent: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private homeService: HomeService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoryId = +params['categoryId'];
      this.categoryName = params['categoryName'];
      console.log('Category Id:', categoryId);
      this.getProductsByCategory(categoryId);
    });
  }

  back() {
    this.router.navigate(['/merchant']);
  }

  getProductsByCategory(categoryId: number) {
    this.showLoading();
    this.homeService.getProductsByCategory(categoryId).subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.dismissLoading();
        console.log('Products fetched successfully', response);
      },
      error: (err) => {
        this.dismissLoading();
        console.error('Error fetching products:', err);
      }
    });
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

  showDetails(product: Product) {
    this.selectedProduct = product;
    this.showProductDetails = true;
  }

  dismissDetails() {
    this.showProductDetails = false;
    this.selectedProduct = null;
  }
}
