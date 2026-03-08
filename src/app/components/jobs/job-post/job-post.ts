import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Job } from '../../../services/job';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-job-post',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-post.html',
  styleUrl: './job-post.css',
})
export class JobPost {
  private jobService = inject(Job);
  private authService = inject(Auth);
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  submitting = false;
  submitted = false;

  formData = {
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: 'Full-time' as const
  };

  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  onSubmit() {
    if (!this.formData.title || !this.formData.company || !this.formData.location || !this.formData.description) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.submitting = true;

    const requirements = this.formData.requirements
      .split(',')
      .map(req => req.trim())
      .filter(req => req.length > 0);

    this.jobService.postJob({
      title: this.formData.title,
      company: this.formData.company,
      location: this.formData.location,
      description: this.formData.description,
      requirements: requirements.length > 0 ? requirements : ['Not specified'],
      salary: this.formData.salary || undefined,
      jobType: this.formData.jobType,
      postedBy: this.currentUser?.id || '1'
    }).subscribe({
      next: (job) => {
        this.submitted = true;
        this.submitting = false;
        setTimeout(() => {
          this.router.navigate(['/jobs', job.id]);
        }, 2000);
      },
      error: (err) => {
        alert('Erreur lors de la création de l\'emploi');
        this.submitting = false;
      }
    });
  }
}
