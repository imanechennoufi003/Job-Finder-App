import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Profile } from './components/profile/profile/profile';
import { JobList } from './components/jobs/job-list/job-list';
import { JobDetail } from './components/jobs/job-detail/job-detail';
import { JobPost } from './components/jobs/job-post/job-post';
import { Chat } from './components/chat/chat/chat';
import { Applications } from './components/applications/applications/applications';
import { NotificationsComponent } from './components/notifications/notifications';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'profile/:id', component: Profile },
  { path: 'jobs', component: JobList, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetail, canActivate: [authGuard] },
  { path: 'post-job', component: JobPost, canActivate: [authGuard] },
  { path: 'chat', component: Chat, canActivate: [authGuard] },
  { path: 'applications', component: Applications, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [authGuard] }
];
