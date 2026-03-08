import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  headline?: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private platformId = inject(PLATFORM_ID);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Récupérer l'utilisateur du localStorage (seulement côté navigateur)
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return new Observable(observer => {
      // Simuler l'authentification
      setTimeout(() => {
        // Mock data - en production, appeler une API
        const user: User = {
          id: '1',
          firstName: 'IMANE',
          lastName: 'Doe',
          email: credentials.email,
          headline: 'Software Engineer',
          bio: 'Passionate about technology'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        
        observer.next({ success: true, user });
        observer.complete();
      }, 500);
    });
  }

  register(data: RegisterData): Observable<any> {
    return new Observable(observer => {
      if (data.password !== data.confirmPassword) {
        observer.error('Les mots de passe ne correspondent pas');
        return;
      }

      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        
        observer.next({ success: true, user });
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
