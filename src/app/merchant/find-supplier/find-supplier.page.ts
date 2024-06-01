import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LoadingController } from '@ionic/angular';
import { SupplierService } from '../services/supplier.service';
import { supplier } from '../models/supplier';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-supplier',
  templateUrl: './find-supplier.page.html',
  styleUrls: ['./find-supplier.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class FindSupplierPage implements OnInit {
  loadingPresent: boolean = false;
  suppliers: supplier[] = [];
  filteredSuppliers: supplier[] = [];
  searchQuery: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private supplierService: SupplierService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ngOnInit called');
    this.showLoading();
    this.supplierService.getSuppliers().subscribe((suppliers: supplier[]) => {
      console.log('Suppliers fetched:', suppliers);
      this.suppliers = suppliers;
      this.filteredSuppliers = suppliers;
      this.dismissLoading();
    }, error => {
      console.error('Error fetching suppliers:', error);
      this.dismissLoading();
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

  viewSupplier(supplierId: number) {
    this.router.navigate(['/profile'], { queryParams: { id: supplierId } });
  }

  searchSuppliers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredSuppliers = this.suppliers.filter(
      (supplier) =>
        (supplier.username && supplier.username.toLowerCase().includes(query)) ||
        (supplier.location && supplier.location.toLowerCase().includes(query))
    );
  }
}
