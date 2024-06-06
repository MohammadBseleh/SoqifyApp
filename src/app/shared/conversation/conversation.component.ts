import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../models/chat';
import { WebSocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonContent, LoadingController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    standalone: true,
    imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule]
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild('contentDiv', { static: false }) content!: ElementRef;
  messages: Message[] = [];
  message: string = '';
  fromUser: string = localStorage.getItem('username')!; // Replace with actual username
  toUser!: string;
  private messageSubscription!: Subscription;
  private websocketSubscription!: Subscription;
  toUserPic: any;

  constructor(
    private websocketService: WebSocketService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.toUser = params['toUser'];
      this.toUserPic = params['toUserPic'];
      this.loadMessageHistory();
    });

    console.log('Connecting to WebSocket as user:', this.fromUser);

    this.websocketSubscription = this.websocketService.receiveMessage().subscribe((message: Message) => {
      this.messages.push(message);
      this.scrollToBottom();
    });

    this.websocketService.connect();
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }, 0);
  }

  loadMessageHistory(): void {
    this.messageSubscription = this.chatService.getMessageHistory(this.fromUser, this.toUser).subscribe(history => {
      this.messages = history;
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const newMessage: Message = {
        fromUser: this.fromUser,
        toUser: this.toUser,
        content: this.message
      };

      this.websocketService.sendMessage('send-message', newMessage);
      this.chatService.sendMessage(newMessage).subscribe();
      this.messages.push(newMessage); // Optimistically add the message to the list
      setTimeout(() => this.scrollToBottom(), 0);
      this.message = '';
    }
  }

  navigateToChat(): void {
    this.router.navigate(['/chat']);
  }
}
