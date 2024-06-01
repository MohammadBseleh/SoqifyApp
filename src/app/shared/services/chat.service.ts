// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  roleId: number = +(localStorage.getItem('roleId') ?? 0);
  constructor(private http: HttpClient) { }

  getMessageHistory(fromUser: string, toUser: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/api/messages/history?fromUser=${fromUser}&toUser=${toUser}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/api/messages`, message);
  }

  getAllChats(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/messages/chats?username=${username}`);
  }

  initiateChat(fromUser: string, toUser: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/messages/initiate?fromUser=${fromUser}&toUser=${toUser}`, {});
  }

  follow(sender: number, receiver: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/follows/${sender}/${receiver}`, {});
  }

  getFollowers(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/follows/followers/${userId}`);
  }

  getFollowing(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/follows/following/${userId}`);
  }
  
}
