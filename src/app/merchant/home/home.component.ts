import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule, IonicModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent  implements OnInit {
activePage: string = 'posts';

  public slideOptions = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true
  };

  constructor() { }

  slides = [
    '../../../assets/random/1.webp',
    '../../../assets/random/2.webp',
    '../../../assets/random/3.webp',
    '../../../assets/random/4.webp',
    '../../../assets/random/5.jpg',
    '../../../assets/random/6.jpg',
  ];

  posts = [
    {
      supplierName: 'Sama Fashion',
      supplierAvatar: '../../../assets/random/6.jpg',
      timestamp: '1 day ago',
      content: 'Get ready for the ultimate shopping event of the year! Dive into a world of vibrant decorations and festive excitement as you snag the best bargains. Mark your calendars.'
  
    },
    {
      supplierName: 'Jazz WholeSale',
      supplierAvatar: '../../../assets/random/6.jpg',
      timestamp: '3 days ago',
      content: 'New Collection Just Dropped!! Don\'t miss the chance to be the first to order! First 10 orders get a 10% DISCOUNT promo code!!'
     },
     {
      supplierName: 'Sama Fashion',
      supplierAvatar: '../../../assets/random/6.jpg',
      timestamp: '1 day ago',
      content: 'Get ready for the ultimate shopping event of the year! Dive into a world of vibrant decorations and festive excitement as you snag the best bargains. Mark your calendars.'
  
    },
    {
      supplierName: 'Jazz WholeSale',
      supplierAvatar: '../../../assets/random/6.jpg',
      timestamp: '3 days ago',
      content: 'New Collection Just Dropped!! Don\'t miss the chance to be the first to order! First 10 orders get a 10% DISCOUNT promo code!!'
     }
  ];

  ngOnInit() {
  }

  changePage(): void {
    this.activePage = this.activePage === 'posts' ? 'products' : 'posts';
  }
}
