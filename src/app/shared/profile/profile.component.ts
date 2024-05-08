import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as pencil from 'ionicons/icons';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

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
    imports: [FooterComponent, HeaderComponent, IonicModule]
})
export class ProfileComponent  implements OnInit {
  currentRating = 0;
  constructor() { }

  ngOnInit() {}
  setRating(rating: number) {
    this.currentRating = rating;
  }
  submitRating(comment: string) {
    // Here you would typically send the rating and comment to your server
    console.log(`Rating: ${this.currentRating}, Comment: ${comment}`);
  }
  ratingChanged(event: any) {
    this.currentRating = event.detail; // Assuming `event.detail.newValue` contains the new rating
  }
}
