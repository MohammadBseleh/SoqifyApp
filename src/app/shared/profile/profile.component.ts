import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as pencil from 'ionicons/icons';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Profile, Rating } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

defineComponents(IgcRatingComponent);

addIcons({
  'pencil': pencil.pencil,
  'star': pencil.star,
  'star-half': pencil['starHalf'],
  'star-outline': pencil['starOutline'],
});
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FooterComponent, HeaderComponent, IonicModule, CommonModule, FormsModule]
})
export class ProfileComponent  implements OnInit {
  currentRating = 0;
  profile!: Profile;
  loading = true;
  loadingPresent: any = false;
  isOwner = false;
  id : number | undefined;
  comment: string = '';
  roleId: number = +(localStorage.getItem('roleId') ?? 0);
  userId: number = +(localStorage.getItem('userId') ?? 0);
  ratingSubmitted = false; // New property to track rating submission
  constructor(private profileService: ProfileService, private loadingCtrl: LoadingController, private route: ActivatedRoute, private toastController: ToastController, private router: Router, private chatService: ChatService) {
    this.route.queryParams.subscribe(queryParams => {
       this.id = Number(queryParams['id']);
      
    });
   }

  ngOnInit() {
    this.showLoading();
    if(this.id) {
      this.profileService.getProfile(this.id).subscribe((profile: Profile) => {
        console.log(profile);
        this.profile = profile;
        this.loading = false;
        this.isOwner = false;
        this.dismissLoading();
      });
      return;
    }
    this.profileService.getProfile().subscribe((profile: Profile) => {
      console.log(profile);
      this.profile = profile;
      this.loading = false;
      this.isOwner = true;
      this.dismissLoading();
    });
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

  setRating(rating: number) {
    this.currentRating = rating;
  }
  async submitRating() {
    this.showLoading();
    // Here you would typically send the rating and comment to your server
    console.log(`Rating: ${this.currentRating}, Comment: ${this.comment}`);
    let rate : Rating = {
      userId: this.profile.profileId,
      rating: this.currentRating,
      comment: this.comment,
    };
    this.profileService.postRating(rate).subscribe(() => {
      console.log('Rating submitted');
      this.profile.ratings.push(rate);
      this.ratingSubmitted = true;
      this.dismissLoading();
      this.presentToast('Rating submitted', 'success');
    }, (error) => {
      console.error('Failed to submit rating', error);
      this.dismissLoading();
      this.presentToast('Failed to submit rating', 'danger');
    })
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

  editProfile(){
    this.router.navigate(['/edit-profile']);
  }

  follow(){
    this.showLoading();
    if(this.roleId === 3){
     this.chatService.follow(this.profile.profileId, this.userId).subscribe(() => {
      this.presentToast('Followed', 'success');
      this.dismissLoading();
    }, (error) => {
      console.error('Failed to follow', error);
      this.presentToast('Failed to follow', 'danger');
      this.dismissLoading();
    }); 
    }else{
      this.chatService.follow( this.userId, this.profile.profileId).subscribe(() => {
        this.presentToast('Followed', 'success');
        this.dismissLoading();
      }, (error) => {
        console.error('Failed to follow', error);
        this.presentToast('Failed to follow', 'danger');
        this.dismissLoading();
      }); 
    }
    
  }

  ratingChanged(event: any) {
    this.currentRating = event.detail; // Assuming `event.detail.newValue` contains the new rating
  }
}
