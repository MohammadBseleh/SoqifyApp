import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    standalone: true,
    imports: [FooterComponent, HeaderComponent]
})
export class OrderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
