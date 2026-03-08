import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notification', () => {
    service.addNotification({
      type: 'info',
      title: 'Test',
      message: 'Test message'
    });

    expect(service.getNotifications().length).toBeGreaterThan(0);
  });

  it('should mark notification as read', () => {
    const notifications = service.getNotifications();
    if (notifications.length > 0) {
      service.markAsRead(notifications[0].id);
      const updated = service.getNotifications();
      expect(updated.find(n => n.id === notifications[0].id)?.read).toBe(true);
    }
  });
});
