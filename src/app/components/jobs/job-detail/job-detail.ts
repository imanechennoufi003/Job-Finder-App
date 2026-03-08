import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Job, JobPosting } from '../../../services/job';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-job-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.css',
})
export class JobDetail implements OnInit {
  private jobService = inject(Job);
  private authService = inject(Auth);
  private route = inject(ActivatedRoute);

  job: JobPosting | null = null;
  currentUser = this.authService.getCurrentUser();
  hasApplied = false;
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    console.log('Loading job with ID:', jobId);
    
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe({
        next: (job) => {
          console.log('Job loaded:', job);
          this.job = job || null;
          this.isLoading = false;
          
          if (!this.job) {
            this.error = 'Emploi non trouvé';
          }
        },
        error: (err) => {
          console.error('Error loading job:', err);
          this.error = 'Erreur lors du chargement du poste';
          this.isLoading = false;
        }
      });

      if (this.currentUser) {
        this.jobService.getUserApplications(this.currentUser.id).subscribe({
          next: (applications) => {
            this.hasApplied = applications.some(app => app.jobId === jobId);
          },
          error: (err) => {
            console.error('Error loading applications:', err);
          }
        });
      }
    } else {
      this.error = 'ID d\'emploi manquant';
      this.isLoading = false;
    }
  }

  applyForJob() {
    if (!this.job || !this.currentUser || this.hasApplied) return;

    this.jobService.applyForJob(this.job.id, this.currentUser.id, 'I am very interested in this position').subscribe({
      next: () => {
        this.hasApplied = true;
        alert('Candidature envoyée avec succès!');
      },
      error: (err) => {
        console.error('Error applying for job:', err);
        alert('Erreur lors de l\'envoi de la candidature');
      }
    });
  }
}
