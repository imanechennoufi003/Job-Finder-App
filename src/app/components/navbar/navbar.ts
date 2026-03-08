import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  showNotificationPanel = false;
  userName = 'IMANE';
  userAvatar = 'https://i.pravatar.cc/150?img=0';
  isVisible = true;

  constructor(
    public notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.updateNavbarVisibility();
    });
    this.updateNavbarVisibility();
  }

  private updateNavbarVisibility() {
    const publicRoutes = ['/login', '/register'];
    this.isVisible = !publicRoutes.includes(this.router.url);
  }

  toggleNotifications() {
    this.showNotificationPanel = !this.showNotificationPanel;
    this.notificationService.showNotificationPanel.set(this.showNotificationPanel);
  }

  closeNotifications() {
    this.showNotificationPanel = false;
    this.notificationService.showNotificationPanel.set(false);
  }

  logout() {
    // Implémenter la logique de déconnexion
    console.log('Logout');
  }
}
