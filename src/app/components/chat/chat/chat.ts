import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chat as ChatService, Conversation, ChatMessage } from '../../../services/chat';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  private chatService = inject(ChatService);
  private authService = inject(Auth);

  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: ChatMessage[] = [];
  messageText = '';
  currentUser = this.authService.getCurrentUser();

  ngOnInit() {
    this.chatService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
      if (!this.selectedConversation && conversations.length > 0) {
        this.selectConversation(conversations[0]);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.chatService.markAsRead(conversation.id).subscribe();
    
    this.chatService.getMessages(conversation.id).subscribe(messages => {
      this.messages = messages;
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  sendMessage() {
    if (!this.messageText.trim() || !this.selectedConversation || !this.currentUser) {
      return;
    }

    this.chatService.sendMessage(
      this.selectedConversation.id,
      this.currentUser.id,
      `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      this.messageText
    ).subscribe(() => {
      this.messageText = '';
      this.chatService.getMessages(this.selectedConversation!.id).subscribe(messages => {
        this.messages = messages;
      });
    });
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  startNewConversation() {
    // In a real app, this would open a dialog to select users
  }

  getOtherParticipantNames(participants: string[]): string {
    if (!this.currentUser) return '';
    const fullName = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    return participants.filter(n => n !== fullName).join(', ');
  }
}
