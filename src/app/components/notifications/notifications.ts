import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService, Notification } from '../../services/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent {
  selectedFilter: 'all' | 'unread' | 'like' | 'comment' | 'message' | 'share' = 'all';

  constructor(public notificationService: NotificationService) {}

  get filteredNotifications(): Notification[] {
    const notifications = this.notificationService.getNotifications();
    
    if (this.selectedFilter === 'all') {
      return notifications;
    }
    
    if (this.selectedFilter === 'unread') {
      return notifications.filter(n => !n.read);
    }
    
    return notifications.filter(n => n.type === this.selectedFilter);
  }

  setFilter(filter: 'all' | 'unread' | 'like' | 'comment' | 'message' | 'share') {
    this.selectedFilter = filter;
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id);
    }
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  clearAll() {
    this.notificationService.clearAllNotifications();
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}j`;

    return new Date(date).toLocaleDateString('fr-FR');
  }

  getIconClass(type: string): string {
    const icons: { [key: string]: string } = {
      like: 'fa-heart',
      comment: 'fa-comment',
      message: 'fa-envelope',
      share: 'fa-share',
      success: 'fa-check-circle',
      warning: 'fa-exclamation-circle',
      error: 'fa-times-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || 'fa-bell';
  }

  getTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      like: 'notification-like',
      comment: 'notification-comment',
      message: 'notification-message',
      share: 'notification-share',
      success: 'notification-success',
      warning: 'notification-warning',
      error: 'notification-error',
      info: 'notification-info'
    };
    return classes[type] || 'notification-info';
  }

  getFilterLabel(type: string): string {
    const labels: { [key: string]: string } = {
      all: 'Toutes',
      unread: 'Non lues',
      like: 'J\'aime',
      comment: 'Commentaires',
      message: 'Messages',
      share: 'Partages'
    };
    return labels[type] || type;
  }
}
