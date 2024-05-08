import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
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
export class ProductsComponent  implements OnInit {
  showProductDetails = false;
  constructor(private router: Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['/merchant']);
  }
  showDetails() {
    this.showProductDetails =  !this.showProductDetails;
  }
  dismissDetails() {
    this.showProductDetails = false;
  }
}
