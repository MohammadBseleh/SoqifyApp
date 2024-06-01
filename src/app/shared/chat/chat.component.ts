import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ContactListModalComponent } from '../contact-list-modal/contact-list-modal.component'; // Import the modal component
import { IonicModule, IonModal } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class ChatComponent implements OnInit {
  chatPartners: string[] = [];
  username: string = localStorage.getItem('username') || 'defaultUsername'; // Replace with the actual username
  newChatPartner: string = '';
  @ViewChild('new_chat') modal!: IonModal;
  open_new_chat: boolean = false;
  roleId: number = +(localStorage.getItem('roleId') ?? 0);
  userId: number = +(localStorage.getItem('userId') ?? 0);
  contacts: any[] = [];
  isSupplier: boolean = this.roleId === 3;
  loadingPresent: any;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalController: ModalController // Add ModalController
  ) {}

  ngOnInit(): void {
    this.loadAllChats();
  }

  async getContacts() {
    this.showLoading();
    if (this.roleId === 3) {
      this.chatService.getFollowers(this.userId).subscribe(
        (contacts) => {
          this.contacts = contacts;
          this.dismissLoading();
        },
        (err) => {
          this.dismissLoading();
        }
      );
    } else {
      this.chatService.getFollowing(this.userId).subscribe(
        (contacts) => {
          this.contacts = contacts;
          this.dismissLoading();
        },
        (err) => {
          this.dismissLoading();
        }
      );
    }
  }

  showLoading(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.loadingPresent) {
        this.loadingCtrl
          .create({
            message: 'Loading',
          })
          .then((loading) => {
            loading
              .present()
              .then(() => {
                this.loadingPresent = true;
                resolve();
              })
              .catch(reject);
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
  }

  dismissLoading() {
    if (this.loadingPresent) {
      this.loadingCtrl.getTop().then((loading) => {
        if (loading) {
          loading.dismiss();
          this.loadingPresent = false;
        }
      });
    }
  }

  async loadAllChats() {
    this.showLoading();
    this.chatService.getAllChats(this.username).subscribe(
      (chats) => {
        this.chatPartners = chats;
        this.dismissLoading();
      },
      (err) => {
        this.dismissLoading();
      }
    );
  }

  navigateToAddSupplier() {
    this.router.navigate(['/find-supplier']);
  }

  openConversation(chatPartner: string) {
    this.router.navigate(['/conversation'], {
      queryParams: { toUser: chatPartner },
    });
  }

  onWillDismiss(event: any) {
    this.modal.dismiss();
  }
  async newChat() {
    this.open_new_chat = true;
    this.modal.present();
    await this.getContacts();
  }
  cancel() {
    this.modal.dismiss();
  }
  startChat(contact: string) {
    this.newChatPartner = contact;
    this.cancel();
    this.addChat();
  }

  addChat() {
    let exist = this.chatPartners.some(
      (partner) => partner === this.newChatPartner
    );
    if (!exist) {
      this.chatPartners.push(this.newChatPartner);
    }
    this.openConversation(this.newChatPartner);
    this.newChatPartner = '';
    
  }
}
