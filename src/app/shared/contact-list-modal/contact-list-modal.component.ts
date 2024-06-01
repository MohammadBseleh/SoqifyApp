import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contact-list-modal',
  templateUrl: './contact-list-modal.component.html',
  styleUrls: ['./contact-list-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, IonicModule],
})
export class ContactListModalComponent implements OnInit {
  contacts: any[] = [];
  roleId: number = +(localStorage.getItem('roleId') ?? 0);
  userId: number = +(localStorage.getItem('userId') ?? 0);
  isSupplier: boolean = this.roleId === 3;
  constructor(
    private modalController: ModalController,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    if(this.roleId === 3) {
      this.chatService.getFollowers(this.userId).subscribe((contacts) => {
      this.contacts = contacts;
    });
    }else {
      this.chatService.getFollowing(this.userId).subscribe((contacts) => {
        this.contacts = contacts;
      });
    }
    
  }

  close() {
    this.modalController.dismiss();
  }

  selectContact(contact: string) {
    this.modalController.dismiss(contact);
  }
}
