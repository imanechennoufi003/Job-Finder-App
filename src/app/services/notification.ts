import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'like' | 'comment' | 'share' | 'message';
  title: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  
  unreadCount = signal(0);
  showNotificationPanel = signal(false);

  constructor() {
    this.loadMockNotifications();
  }

  private loadMockNotifications() {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'like',
        title: 'Jean Dupont a aimé votre post',
        message: 'Jean Dupont a aimé votre offre d\'emploi "Senior Developer"',
        avatar: 'https://i.pravatar.cc/150?img=1',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        userName: 'Jean Dupont',
        actionUrl: '/jobs/detail/1'
      },
      {
        id: '2',
        type: 'comment',
        title: 'Marie Martin a commenté',
        message: 'Vous avez un nouveau commentaire sur votre offre d\'emploi',
        avatar: 'https://i.pravatar.cc/150?img=2',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        userName: 'Marie Martin',
        actionUrl: '/jobs/detail/2'
      },
      {
        id: '3',
        type: 'message',
        title: 'Nouveau message de Pierre Leclerc',
        message: 'Bonjour, je suis intéressé par le poste...',
        avatar: 'https://i.pravatar.cc/150?img=3',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        userName: 'Pierre Leclerc',
        actionUrl: '/chat'
      },
      {
        id: '4',
        type: 'share',
        title: 'Sophie Bernard a partagé votre profil',
        message: 'Sophie Bernard a partagé votre profil avec son réseau',
        avatar: 'https://i.pravatar.cc/150?img=4',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true,
        userName: 'Sophie Bernard',
        actionUrl: '/profile'
      },
      {
        id: '5',
        type: 'success',
        title: 'Candidature acceptée',
        message: 'Félicitations ! Vous avez été sélectionné pour le poste de Developer',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        read: true,
        actionUrl: '/applications'
      }
    ];

    this.notificationsSubject.next(mockNotifications);
    this.updateUnreadCount();
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...current]);
    this.updateUnreadCount();
  }

  markAsRead(id: string) {
    const notifications = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  markAllAsRead() {
    const notifications = this.notificationsSubject.value.map(n => ({
      ...n,
      read: true
    }));
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  deleteNotification(id: string) {
    const notifications = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  clearAllNotifications() {
    this.notificationsSubject.next([]);
    this.updateUnreadCount();
  }

  private updateUnreadCount() {
    const count = this.notificationsSubject.value.filter(n => !n.read).length;
    this.unreadCount.set(count);
  }

  getNotifications(): Notification[] {
    return this.notificationsSubject.value;
  }
}
