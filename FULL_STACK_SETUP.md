# Job Finder App - Full Stack Setup

## Project Structure

```
job-finder-app/
├── src/                    # Angular Frontend
│   ├── app/
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   └── ...
├── api/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/Api/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── database.sqlite
│   ├── routes/
│   │   ├── api.php         # API Routes
│   │   └── web.php
│   ├── .env                # Configuration
│   └── ...
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## Development Workflow

### 1. Start the Laravel Backend

```bash
cd api
php artisan serve
```

The backend API will run on `http://localhost:8000`

### 2. Start the Angular Frontend (in another terminal)

```bash
npm start
```

The frontend will run on `http://localhost:4200`

### 3. Connect Frontend to Backend

Update the API endpoints in your Angular services to point to `http://localhost:8000/api/`

## Key Features Implemented

### Backend (Laravel)
- ✅ Database schema for Jobs, Users, Applications, Chats, Notifications
- ✅ User authentication with Laravel Sanctum
- ✅ API controllers for all main entities
- ✅ RESTful API routes with proper HTTP methods
- ✅ CORS configuration for Angular frontend
- ✅ Database migrations for consistent schema management

### Frontend (Angular)
- ✅ Authentication components (Login, Register)
- ✅ Job listing and detail pages
- ✅ Job posting form
- ✅ Application management
- ✅ Chat interface
- ✅ Notifications panel
- ✅ User dashboard
- ✅ User profile management

## API Base URL

During development:
```
http://localhost:8000/api
```

For production, update with your server URL.

## Environment Variables

### Backend (.env in api/ folder)
- `APP_NAME=Laravel`
- `APP_ENV=local`
- `APP_DEBUG=true`
- `APP_URL=http://localhost:8000`
- `DB_CONNECTION=sqlite`
- `SESSION_DRIVER=database`

### Frontend (environment.ts)
- Update API endpoint in `src/environments/environment.ts`

## Database

Using SQLite by default. The database file is located at `api/database/database.sqlite`

To use MySQL instead:
1. Update `.env` in api folder:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=job_finder
DB_USERNAME=root
DB_PASSWORD=your_password
```

2. Create the database in MySQL
3. Run migrations: `php artisan migrate`

## User Roles

The app supports three user roles:
- **job_seeker** - Can search and apply for jobs
- **employer** - Can post and manage jobs
- **admin** - Can manage all aspects of the platform

## Testing

### Backend Tests
```bash
cd api
php artisan test
```

### Frontend Tests
```bash
npm test
```

## Troubleshooting

### Port Already in Use
- Laravel uses port 8000 by default
- Angular uses port 4200 by default

If ports are in use, specify different ones:
```bash
# Laravel on different port
php artisan serve --port=8001

# Angular on different port
ng serve --port=4201
```

### CORS Issues
If you see CORS errors, ensure:
1. Laravel backend is running
2. Frontend is making requests to `http://localhost:8000/api`
3. CORS is properly configured in Laravel

### Database Issues
Clear migrations and reset:
```bash
cd api
php artisan migrate:reset
php artisan migrate
```

## Next Steps

1. **Seed Sample Data** - Create seeders for testing
2. **User Upload** - Implement file upload for avatars
3. **Search & Filtering** - Add advanced job search features
4. **Email Notifications** - Configure email for notifications
5. **Real-time Chat** - Implement WebSocket for real-time messaging
6. **Deployment** - Set up production environment

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

Created: December 2025
