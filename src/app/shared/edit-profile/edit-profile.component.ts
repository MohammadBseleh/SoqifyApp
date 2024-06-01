import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { FooterComponent } from "../footer/footer.component";
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent]
})
export class EditProfileComponent  implements OnInit {
  profileForm: FormGroup;
  loadingPresent = false;
  profile!: Profile;
  
  constructor( private profileService: ProfileService,private fb: FormBuilder, private http: HttpClient, private loadingCtrl: LoadingController, private toastController: ToastController, private router: Router) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{value: '', disabled: true}],
      location: ['', Validators.required],
      storeWebLink: [''],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required],
      socialMediaFacebook: [''],
      socialMediaTelegram: [''],
      socialMediaInstagram: [''],
      
  });
   }

  ngOnInit() {
    this.showLoading();
    this.profileService.getProfile().subscribe((profile: Profile) => {
      this.profile = profile;
      this.profileForm.patchValue(profile);
      this.dismissLoading();
    }
    );
  }

  cancel(){
    console.log('cancel');
    this.router.navigate(['profile']);
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
    if (this.profileForm.valid) {
        const formData = this.profileForm.getRawValue();
        this.http.put(`${environment.apiUrl}/userProfile/update`, formData).subscribe(
            response => {
                console.log('Profile updated successfully');
                this.presentToast('Profile updated successfully', 'success');
            },
            error => {
                console.error('Error updating profile', error);
                this.presentToast('Error updating profile', 'danger');
            }
        );
    }
}
}
