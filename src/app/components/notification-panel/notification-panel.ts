import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService, Notification } from '../../services/notification';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification-panel.html',
  styleUrl: './notification-panel.css'
})
export class NotificationPanelComponent implements OnInit {
  notifications: Notification[] = [];
  notificationService = NotificationService;

  constructor(public notificationSvc: NotificationService) {}

  ngOnInit() {
    this.notificationSvc.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  togglePanel() {
    this.notificationSvc.showNotificationPanel.update(v => !v);
  }

  closePanel() {
    this.notificationSvc.showNotificationPanel.set(false);
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      this.notificationSvc.markAsRead(notification.id);
    }
  }

  deleteNotification(id: string) {
    this.notificationSvc.deleteNotification(id);
  }

  markAllAsRead() {
    this.notificationSvc.markAllAsRead();
  }

  clearAll() {
    this.notificationSvc.clearAllNotifications();
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
}
