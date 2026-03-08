# Job Finder App - Backend API (Laravel)

## Setup Instructions

### Prerequisites
- PHP 8.2+
- Composer
- SQLite (or configure another database)

### Installation

1. Navigate to the api directory:
```bash
cd api
```

2. Install dependencies (already done if created with composer):
```bash
composer install
```

3. Generate application key (already done):
```bash
php artisan key:generate
```

4. Run migrations:
```bash
php artisan migrate
```

5. (Optional) Seed database with sample data:
```bash
php artisan db:seed
```

### Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Database Structure

#### Users Table
- id
- name
- email
- password
- role (job_seeker, employer, admin)
- bio
- avatar
- phone
- location
- email_verified_at
- remember_token
- created_at
- updated_at

#### Jobs Table
- id
- user_id (employer who posted the job)
- title
- description
- location
- company
- salary
- job_type (full-time, part-time, contract)
- requirements
- status (active, closed, draft)
- deadline
- created_at
- updated_at

#### Job Applications Table
- id
- job_id
- user_id (job seeker applying)
- cover_letter
- status (pending, accepted, rejected, withdrawn)
- notes
- created_at
- updated_at

#### Chats Table
- id
- sender_id
- recipient_id
- message
- is_read
- created_at
- updated_at

#### Notifications Table
- id
- user_id
- type
- message
- related_model
- related_id
- is_read
- created_at
- updated_at

### API Endpoints

#### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (requires auth)

#### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (employer only)
- `GET /api/jobs/{id}` - Get job details
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

#### Job Applications
- `GET /api/job-applications` - Get applications
- `POST /api/job-applications` - Apply for job
- `GET /api/job-applications/{id}` - Get application details
- `PUT /api/job-applications/{id}` - Update application
- `DELETE /api/job-applications/{id}` - Withdraw application
- `POST /api/job-applications/{id}/accept` - Accept application
- `POST /api/job-applications/{id}/reject` - Reject application

#### Chats
- `GET /api/chats` - Get all chats
- `POST /api/chats` - Create/send chat message
- `GET /api/chats/{id}` - Get chat details
- `PUT /api/chats/{id}` - Update chat
- `DELETE /api/chats/{id}` - Delete chat
- `GET /api/chats/user/{userId}` - Get user's chats
- `POST /api/chats/{id}/mark-as-read` - Mark chat as read

#### Notifications
- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create notification
- `GET /api/notifications/{id}` - Get notification details
- `PUT /api/notifications/{id}` - Update notification
- `DELETE /api/notifications/{id}` - Delete notification
- `POST /api/notifications/{id}/mark-as-read` - Mark notification as read
- `GET /api/notifications/unread/count` - Get unread notification count

### Configuration

Update `.env` file as needed:
- `APP_URL` - Application URL
- `DB_CONNECTION` - Database type (sqlite, mysql, pgsql, etc.)
- `DB_DATABASE` - Database name/path
- `MAIL_DRIVER` - Email driver
- `SANCTUM_STATEFUL_DOMAINS` - Allowed domains for stateful requests

### CORS Configuration

CORS is configured to allow requests from the Angular frontend. Update `config/cors.php` if needed.

### Authentication

This API uses Laravel Sanctum for authentication. After login, you'll receive a token to use in subsequent requests.

Include the token in request headers:
```
Authorization: Bearer {token}
```

---

For more information, visit [Laravel Documentation](https://laravel.com/docs)
