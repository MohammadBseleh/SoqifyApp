import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { IonIcon } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    standalone: true,
    imports: [IonIcon, FooterComponent]
})
export class ConversationComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToChat() {
    this.router.navigate(['/chat']);
  }
}
