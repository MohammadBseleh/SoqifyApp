import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent]
})
export class NotificationsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
