import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket: Socket;

  constructor() {
    this.webSocket = new Socket({
      url: "ws://localhost:9092",
      options: { transports: ['websocket'] },
    });

    // Handle the built-in connect event
    this.webSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.customConnect(localStorage.getItem('username')!);
    });

    // Handle the built-in disconnect event
    this.webSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Handle any connection errors
    this.webSocket.on('connect_error', (error: any) => {
      console.error('WebSocket connection error:', error);
    });

    this.webSocket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
    });
  }

  connect(): void {
    this.webSocket.connect();
  }

  customConnect(username: string): void {
    this.webSocket.emit('custom-connect', username);
  }

  sendMessage(event: string, message: any): void {
    this.webSocket.emit(event, message);
  }

  receiveMessage(): Observable<any> {
    return this.webSocket.fromEvent('get-response');
  }

  disconnect(): void {
    this.webSocket.disconnect();
  }
}
