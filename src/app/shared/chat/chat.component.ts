import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule ]
})
export class ChatComponent  implements OnInit {
  chatCards = new Array(5).fill(null);
  constructor(private router: Router) { }

  ngOnInit() {}

  openConversation() {
    this.router.navigate(['/conversation']);
  }

}
