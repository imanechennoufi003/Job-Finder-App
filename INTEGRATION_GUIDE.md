# Job Finder App - Complete Integration Guide

## ✅ Backend Setup Complete

Your Laravel backend has been fully set up with:

### Database Models
- ✅ **User** - With role (job_seeker, employer, admin), bio, avatar, phone, location
- ✅ **Job** - Job listings with all details, requirements, deadline
- ✅ **JobApplication** - Track job applications with status and notes
- ✅ **Chat** - Direct messaging between users
- ✅ **Notification** - User notifications with read status

### API Controllers
- ✅ **JobController** - Full CRUD operations for jobs
- ✅ **JobApplicationController** - Apply, accept, reject applications
- ✅ **ChatController** - Messaging functionality
- ✅ **NotificationController** - Notification management
- ✅ **AuthController** - User registration and login

### Database
- ✅ SQLite configured and ready
- ✅ All migrations created and run
- ✅ Tables with proper relationships and foreign keys

---

## 🚀 Quick Start

### Option 1: Using the Batch Script (Windows)
Simply double-click `start-dev.bat` in the project root. This will:
- Start Angular frontend on `http://localhost:4200`
- Start Laravel backend on `http://localhost:8000`

### Option 2: Manual Start

**Terminal 1 - Start Frontend:**
```bash
npm start
```

**Terminal 2 - Start Backend:**
```bash
cd api
php artisan serve
```

---

## 📱 Frontend Integration

### Update Your Angular Services

The frontend already has service files. Update them to use the backend API:

**Example: Job Service** (`src/app/services/job.ts`)
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get(`${this.apiUrl}/jobs`);
  }

  getJob(id: number) {
    return this.http.get(`${this.apiUrl}/jobs/${id}`);
  }

  createJob(jobData: any) {
    return this.http.post(`${this.apiUrl}/jobs`, jobData);
  }

  updateJob(id: number, jobData: any) {
    return this.http.put(`${this.apiUrl}/jobs/${id}`, jobData);
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.apiUrl}/jobs/${id}`);
  }
}
```

**Example: Auth Service** (`src/app/services/auth.ts`)
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend
    }
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        finalize(() => {
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
```

### Set Up HTTP Interceptor

Create an interceptor to automatically add authentication token to requests:

**`src/app/interceptors/auth.interceptor.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
```

Add to `app.config.ts`:
```typescript
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
All endpoints except `/register` and `/login` require authentication with Bearer token.

### Endpoints

#### Auth
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout (requires auth)

#### Jobs
- `GET /jobs` - List all jobs (paginated)
- `POST /jobs` - Create job (employers only)
- `GET /jobs/{id}` - Get job details
- `PUT /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job

#### Applications
- `GET /job-applications` - List applications
- `POST /job-applications` - Create application
- `GET /job-applications/{id}` - Get application
- `PUT /job-applications/{id}` - Update application
- `DELETE /job-applications/{id}` - Delete application
- `POST /job-applications/{id}/accept` - Accept application
- `POST /job-applications/{id}/reject` - Reject application

#### Chat
- `GET /chats` - List chats
- `POST /chats` - Send message
- `GET /chats/{id}` - Get chat details
- `GET /chats/user/{userId}` - Get user's chats
- `POST /chats/{id}/mark-as-read` - Mark as read

#### Notifications
- `GET /notifications` - List notifications
- `GET /notifications/{id}` - Get notification
- `POST /notifications/{id}/mark-as-read` - Mark as read
- `GET /notifications/unread/count` - Get unread count

---

## 🗄️ Database Schema

### Users Table
```sql
id, name, email, password, role, bio, avatar, phone, location, email_verified_at, remember_token, created_at, updated_at
```

### Jobs Table
```sql
id, user_id, title, description, location, company, salary, job_type, requirements, status, deadline, created_at, updated_at
```

### Job Applications Table
```sql
id, job_id, user_id, cover_letter, status, notes, created_at, updated_at
```

### Chats Table
```sql
id, sender_id, recipient_id, message, is_read, created_at, updated_at
```

### Notifications Table
```sql
id, user_id, type, message, related_model, related_id, is_read, created_at, updated_at
```

---

## 🔒 Security Notes

1. **CORS** - Configured to allow Angular frontend
2. **Authentication** - Using Laravel Sanctum for API tokens
3. **Environment Variables** - Keep `.env` file secure, never commit to git
4. **Password Hashing** - Passwords are automatically hashed using bcrypt

---

## 🧪 Testing

### Test API Endpoints

Using cURL or Postman:

**Register:**
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IMANE CHENNOUFI",
    "email": "imane@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "job_seeker"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Jobs (with token):**
```bash
curl -X GET http://localhost:8000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚨 Troubleshooting

### Port Conflicts
If ports are already in use:
```bash
# Change Laravel port
php artisan serve --port=8001

# Change Angular port
ng serve --port=4201
```

### CORS Errors
Ensure:
1. Laravel backend is running on `http://localhost:8000`
2. Angular frontend is on `http://localhost:4200`
3. CORS is enabled in Laravel

### Database Issues
Reset database:
```bash
cd api
php artisan migrate:reset
php artisan migrate
```

### Module Not Found
If you see module errors, reinstall dependencies:
```bash
# Frontend
npm install

# Backend
cd api && composer install
```

---

## 📚 Next Steps

1. **Implement Advanced Features:**
   - Search and filtering
   - Job recommendations
   - Real-time notifications using WebSockets
   - File uploads for avatars and CVs

2. **Production Deployment:**
   - Set up proper database (MySQL/PostgreSQL)
   - Configure environment variables
   - Deploy on hosting platform

3. **Additional Features:**
   - Email notifications
   - Job favorites/bookmarks
   - User reviews/ratings
   - Advanced permissions system

---

## 📖 Resources

- [Laravel Docs](https://laravel.com/docs)
- [Angular Docs](https://angular.io/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

**Last Updated:** December 16, 2025
