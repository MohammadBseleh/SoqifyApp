import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [FooterComponent, HeaderComponent, IonicModule]
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
