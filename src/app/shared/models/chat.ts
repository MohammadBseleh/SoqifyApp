export interface Message {
  id?: number;
  fromUser: string;
  toUser: string;
  content: string;
  timestamp?: string;
}