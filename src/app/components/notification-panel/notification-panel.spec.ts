import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPanelComponent } from './notification-panel';
import { NotificationService } from '../../services/notification';

describe('NotificationPanelComponent', () => {
  let component: NotificationPanelComponent;
  let fixture: ComponentFixture<NotificationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationPanelComponent],
      providers: [NotificationService]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle panel', () => {
    component.togglePanel();
    expect(component.notificationSvc.showNotificationPanel()).toBe(true);
    component.togglePanel();
    expect(component.notificationSvc.showNotificationPanel()).toBe(false);
  });

  it('should mark notification as read', () => {
    const notification = component.notifications[0];
    if (notification && !notification.read) {
      component.markAsRead(notification);
      expect(notification.read).toBe(true);
    }
  });
});
