import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActiveIconService } from 'src/app/shared/services/active-icon.service';
import { HomeService } from '../services/home.service';
import { Category, Post } from '../models/home';
import { query } from '@angular/animations';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule, IonicModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent  implements OnInit {
activePage: string = this.activeService.getActiveHomePage();

  public slideOptions = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true
  };
  loadingPresent: any;

  constructor(private router: Router, private activeService: ActiveIconService, private homeService : HomeService, private loadingCtrl: LoadingController) { }

  slides = [
    '../../../assets/random/1.webp',
    '../../../assets/random/2.webp',
    '../../../assets/random/3.webp',
    '../../../assets/random/4.webp',
    '../../../assets/random/5.jpg',
    '../../../assets/random/6.jpg',
  ];

  posts : Post[] = [];
  categories : Category[] = [];

  ngOnInit() {
    this.posts = this.getPosts();
    this.categories = this.getCategories(); 
  }

  getCategories(): Category[]{
    this.showLoading();
    this.homeService.getCategories().subscribe({
      next: (response : Category[]) => {
        this.categories = response;
        console.log(response)
        this.dismissLoading();
      },
      error: (err) => {
        this.dismissLoading();
        console.error('failed to fetch categories', err)}
    })
    return this.categories;
  }

  getPosts(): Post[] {
    this.homeService.getPosts().subscribe({
      next: (response : Post[]) => {
        console.log('Posts fetched successfully', response);
        this.posts = response;
        this.dismissLoading();
      },
      error: (err) => {
        console.error('Failed to fetch posts', err);
        this.dismissLoading();
      }
    });
    return this.posts;
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
  
  changePage(page : string): void {
    this.activePage = page;
    this.activeService.setActiveHomePage(page);
  }
  navigateToProducts(categoryId: number, categoryName: string) {
    this.router.navigate(['/products'], { queryParams: { categoryId: categoryId, categoryName: categoryName } });
  }
}
