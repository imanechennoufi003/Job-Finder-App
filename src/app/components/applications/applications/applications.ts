import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Job, JobApplication } from '../../../services/job';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-applications',
  imports: [CommonModule, RouterLink],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Applications implements OnInit {
  private jobService = inject(Job);
  private authService = inject(Auth);

  applications: JobApplication[] = [];
  currentUser = this.authService.getCurrentUser();

  ngOnInit() {
    if (this.currentUser) {
      this.jobService.getUserApplications(this.currentUser.id).subscribe(applications => {
        this.applications = applications;
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'applied': return '#0a66c2';
      case 'reviewing': return '#ff9800';
      case 'interview': return '#4caf50';
      case 'accepted': return '#27ae60';
      case 'rejected': return '#d32f2f';
      default: return '#666';
    }
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'applied': 'Candidature envoyée',
      'reviewing': 'Examen en cours',
      'interview': 'Entretien',
      'accepted': 'Accepté',
      'rejected': 'Rejeté'
    };
    return labels[status] || status;
  }
}
