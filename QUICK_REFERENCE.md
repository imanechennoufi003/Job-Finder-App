<!-- Quick Reference Card -->

# Job Finder App - Quick Reference

## Start Development

```bash
# Option 1: Windows Batch (Automatic)
start-dev.bat

# Option 2: Manual
npm start                    # Terminal 1 - Frontend
cd api && php artisan serve  # Terminal 2 - Backend
```

## URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | Angular app |
| Backend | http://localhost:8000 | Laravel API |
| API | http://localhost:8000/api | REST endpoints |

## Database

| Table | Purpose |
|-------|---------|
| users | User accounts |
| jobs | Job listings |
| job_applications | Job applications |
| chats | Messages |
| notifications | User notifications |

## API Routes (Auth Required)

```
GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/{id}
PUT    /api/jobs/{id}
DELETE /api/jobs/{id}

POST   /api/job-applications
GET    /api/job-applications/{id}

POST   /api/chats
GET    /api/chats

GET    /api/notifications
POST   /api/notifications/{id}/mark-as-read
```

## Auth Routes (No Auth Required)

```
POST /api/register
POST /api/login
POST /api/logout  (Auth Required)
```

## File Locations

- **Frontend**: `src/`
- **Backend**: `api/`
- **Database**: `api/database/database.sqlite`
- **API Controllers**: `api/app/Http/Controllers/Api/`
- **Models**: `api/app/Models/`
- **Migrations**: `api/database/migrations/`
- **Routes**: `api/routes/api.php`

## Key Files

| File | Purpose |
|------|---------|
| start-dev.bat | Quick start script |
| INTEGRATION_GUIDE.md | Frontend integration steps |
| FULL_STACK_SETUP.md | Complete setup guide |
| BACKEND_READY.md | Backend summary |
| api/BACKEND_SETUP.md | Backend documentation |

## Common Commands

```bash
# Frontend
npm start
npm test
npm run build

# Backend (from api/ folder)
php artisan serve
php artisan migrate
php artisan tinker
php artisan test
```

## Environment Variables

**Frontend**: Add to `environment.ts`
```typescript
apiUrl: 'http://localhost:8000/api'
```

**Backend**: Edit `api/.env`
```
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
```

## Authentication

1. Register: `POST /api/register`
2. Login: `POST /api/login` → Get token
3. Use token: `Authorization: Bearer {token}`

## User Roles

- `job_seeker` - Can apply for jobs
- `employer` - Can post jobs
- `admin` - Full access

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change port: `php artisan serve --port=8001` |
| Module not found | `npm install` or `composer install` |
| DB error | `php artisan migrate:reset && php artisan migrate` |
| CORS error | Ensure backend is running on port 8000 |

---

**Everything is ready! Start the servers and begin coding!** 🚀

For detailed guides, see:
- INTEGRATION_GUIDE.md (frontend integration)
- BACKEND_READY.md (setup summary)
