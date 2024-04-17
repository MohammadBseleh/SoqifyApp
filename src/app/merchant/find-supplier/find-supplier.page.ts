import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
    selector: 'app-find-supplier',
    templateUrl: './find-supplier.page.html',
    styleUrls: ['./find-supplier.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class FindSupplierPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
