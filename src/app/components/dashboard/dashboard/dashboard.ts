import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth, User as AuthUser } from '../../../services/auth';
import { Job, JobPosting } from '../../../services/job';
import { Chat as ChatService, Conversation } from '../../../services/chat';
import { PostService, Post } from '../../../services/post';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(Auth);
  private jobService = inject(Job);
  private chatService = inject(ChatService);
  private postService = inject(PostService);
  private router = inject(Router);

  currentUser: AuthUser | null = null;
  jobs: JobPosting[] = [];
  conversations: Conversation[] = [];
  posts: Post[] = [];
  unreadCount = 0;
  newPostContent = '';
  postImagePreview: string | null = null;
  postImageFile: File | null = null;
  showCommentInput: { [key: string]: boolean } = {};
  commentText: { [key: string]: string } = {};

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs.slice(0, 3);
    });

    this.chatService.getConversations().subscribe(conversations => {
      this.conversations = conversations.slice(0, 3);
      this.unreadCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
    });

    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  publishPost() {
    if (!this.newPostContent.trim() || !this.currentUser) return;
    this.postService.addPost(
      this.newPostContent,
      this.currentUser.id,
      `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      this.currentUser.avatar || 'https://api.dicebear.com/7.x/personas/svg?seed=default',
      this.postImagePreview || undefined
    ).subscribe(() => {
      this.newPostContent = '';
      this.postImagePreview = null;
      this.postImageFile = null;
    });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.postImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.postImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.postImagePreview = null;
    this.postImageFile = null;
  }

  likePost(postId: string) {
    this.postService.likePost(postId).subscribe();
  }

  toggleCommentInput(postId: string) {
    this.showCommentInput[postId] = !this.showCommentInput[postId];
  }

  addComment(postId: string) {
    if (!this.commentText[postId]?.trim() || !this.currentUser) return;
    this.postService.addComment(
      postId,
      this.currentUser.id,
      `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      this.currentUser.avatar || 'https://api.dicebear.com/7.x/personas/svg?seed=default',
      this.commentText[postId]
    ).subscribe(() => {
      this.commentText[postId] = '';
      this.showCommentInput[postId] = false;
    });
  }

  sharePost(postId: string) {
    this.postService.sharePost(postId).subscribe();
  }

  getOtherParticipantNames(participants: string[]): string {
    if (!this.currentUser) return '';
    const fullName = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    return participants.filter(n => n !== fullName).join(', ');
  }

  getJobColor(index: number): string {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#4facfe',
      '#00f2fe', '#43e97b', '#fa709a', '#fee140',
      '#30cfd0', '#330867'
    ];
    return colors[index % colors.length];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
