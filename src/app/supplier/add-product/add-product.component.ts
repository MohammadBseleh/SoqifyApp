import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Category } from 'src/app/merchant/models/home';
import { HomeService } from 'src/app/merchant/services/home.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories: Category[] = [];
  sizes: string[] = [
    '3-6 Y',
    '0-2 Y',
    '6-9 Y',
    '9-12 Y',
    '12-18 Y',
    '5-9 Y',
    '3-18 M',
    '12-24 M',
    '0-9 M',
  ];
  loadingPresent: boolean = false;

  constructor(private homeService: HomeService, private fb: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingCtrl: LoadingController) {
    this.categories = this.getCategories();
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required], // renamed from label to productName
      productCategory: ['', Validators.required], // unchanged
      brand: ['', Validators.required], // unchanged
      pieces: ['', [Validators.required, this.singleDigitValidator]], // unchanged
      description: ['', Validators.required], // unchanged
      price: [null, Validators.required], // unchanged
      stock: [null, Validators.required], // unchanged
      sizes: ['', Validators.required], // unchanged
      colors: ['', Validators.required], // unchanged
    });
  }

  ngOnInit() {
  }

  getCategories(): Category[] {
    this.homeService.getCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
        console.log(response);
      },
      error: (err) => console.error('failed to fetch categories', err),
    });
    return this.categories;
  }

  showLoading(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.loadingPresent) {
        this.loadingCtrl.create({
          message: 'Loading',
        }).then(loading => {
          loading.present().then(() => {
            this.loadingPresent = true;
            resolve();
          }).catch(reject);
        }).catch(reject);
      } else {
        resolve();
      }
    });
  }
  

  dismissLoading() {
    if (this.loadingPresent) {
      this.loadingCtrl.getTop().then(loading => {
        if (loading) {
          loading.dismiss();
          this.loadingPresent = false;
        }
      });
    }
  }

  singleDigitValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value !== null && value.toString().length === 1 && value >= 0 && value <= 9 ? null : { singleDigit: true };
  }

  onPiecesInput(event: any): void {
    const value = event.target.value;
    if (value.length > 1) {
      event.target.value = value.slice(0, 1);
      this.addProductForm.get('pieces')?.setValue(value.slice(0, 1));
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 1) {
      event.preventDefault(); // Prevent further input if the length is already 1
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: color,
        position: 'top',
        cssClass: 'custom-toast'
    });
    toast.present();
}

  onSubmit() {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();      
    } else {
      this.showLoading();
      const formData = this.addProductForm.value;
      const requestBody = {
        productName: formData.productName,
        description: formData.description,
        price: formData.price,
        brand: formData.brand,
        categoryId: this.categories.find(cat => cat.name === formData.productCategory)?.categoryId || null,
        stockQuantity: formData.stock,
        availableSizes: [formData.sizes],
        availableColors: formData.colors.split(',').map((color : any) => color.trim())
      };

      this.http.post(`${environment.apiUrl}/products/supplier/addProduct`, requestBody).subscribe({
        next: response => {
          console.log('Product added successfully', response);
          this.presentToast('Product added successfully', 'success');
          this.dismissLoading();
        },
        error: error => {
          console.error('Error adding product', error);
          this.presentToast('Error adding product', 'danger');
          this.dismissLoading();
        }
      });
    }
  }
}
