import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage?: ChatMessage;
  lastMessageTime?: Date;
  unreadCount: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  public conversations$ = this.conversationsSubject.asObservable();

  private messagesSubject = new BehaviorSubject<Map<string, ChatMessage[]>>(new Map());
  public messages$ = this.messagesSubject.asObservable();

  private mockConversations: Conversation[] = [
    {
      id: '1',
      participants: ['1', '2'],
      participantNames: ['IMANE CHENNOUFI', 'Jane Smith'],
      lastMessageTime: new Date(),
      unreadCount: 2,
      createdAt: new Date()
    },
    {
      id: '2',
      participants: ['1', '3'],
      participantNames: ['IMANE CHENNOUFI', 'Mike Johnson'],
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
      createdAt: new Date(Date.now() - 86400000)
    }
  ];

  private mockMessages: Map<string, ChatMessage[]> = new Map([
    ['1', [
      {
        id: '1',
        conversationId: '1',
        senderId: '1',
        senderName: 'IMANE CHENNOUFI',
        content: 'Hi Jane! How are you?',
        timestamp: new Date(Date.now() - 300000),
        read: true
      },
      {
        id: '2',
        conversationId: '1',
        senderId: '2',
        senderName: 'Jane Smith',
        content: 'Hey! I am doing great, thanks for asking!',
        timestamp: new Date(Date.now() - 200000),
        read: true
      },
      {
        id: '3',
        conversationId: '1',
        senderId: '2',
        senderName: 'Jane Smith',
        content: 'How about the project?',
        timestamp: new Date(Date.now() - 100000),
        read: false
      }
    ]],
    ['2', [
      {
        id: '4',
        conversationId: '2',
        senderId: '3',
        senderName: 'Mike Johnson',
        content: 'Hi IMANE, let\'s catch up soon',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ]]
  ]);

  constructor() {
    this.conversationsSubject.next(this.mockConversations);
    this.messagesSubject.next(this.mockMessages);
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$;
  }

  getMessages(conversationId: string): Observable<ChatMessage[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const messages = this.mockMessages.get(conversationId) || [];
        observer.next(messages);
        observer.complete();
      }, 300);
    });
  }

  sendMessage(conversationId: string, senderId: string, senderName: string, content: string): Observable<ChatMessage> {
    return new Observable(observer => {
      setTimeout(() => {
        const message: ChatMessage = {
          id: Date.now().toString(),
          conversationId,
          senderId,
          senderName,
          content,
          timestamp: new Date(),
          read: false
        };

        // Add message to conversation
        const messages = this.mockMessages.get(conversationId) || [];
        messages.push(message);
        const allMessages = this.mockMessages;
        allMessages.set(conversationId, messages);
        this.messagesSubject.next(allMessages);

        // Update conversation last message
        const conversations = this.conversationsSubject.value;
        const conversation = conversations.find(c => c.id === conversationId);
        if (conversation) {
          conversation.lastMessage = message;
          conversation.lastMessageTime = new Date();
        }
        this.conversationsSubject.next([...conversations]);

        observer.next(message);
        observer.complete();
      }, 300);
    });
  }

  createConversation(participants: string[], participantNames: string[]): Observable<Conversation> {
    return new Observable(observer => {
      setTimeout(() => {
        const conversation: Conversation = {
          id: Date.now().toString(),
          participants,
          participantNames,
          unreadCount: 0,
          createdAt: new Date()
        };
        
        this.mockConversations.push(conversation);
        this.messagesSubject.next(new Map(this.mockMessages).set(conversation.id, []));
        this.conversationsSubject.next([...this.mockConversations]);
        
        observer.next(conversation);
        observer.complete();
      }, 300);
    });
  }

  markAsRead(conversationId: string): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const messages = this.mockMessages.get(conversationId) || [];
        messages.forEach(m => m.read = true);
        
        const conversations = this.conversationsSubject.value;
        const conversation = conversations.find(c => c.id === conversationId);
        if (conversation) {
          conversation.unreadCount = 0;
        }
        this.conversationsSubject.next([...conversations]);
        
        observer.next();
        observer.complete();
      }, 300);
    });
  }
}
