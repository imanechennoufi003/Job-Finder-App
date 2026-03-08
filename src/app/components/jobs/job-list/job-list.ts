import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Job, JobPosting } from '../../../services/job';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-job-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit {
  private jobService = inject(Job);
  private authService = inject(Auth);

  jobs: JobPosting[] = [];
  filteredJobs: JobPosting[] = [];
  searchQuery = '';
  currentUser = this.authService.getCurrentUser();
  appliedJobs: string[] = [];

  ngOnInit() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.filteredJobs = jobs;
    });

    if (this.currentUser) {
      this.jobService.getUserApplications(this.currentUser.id).subscribe(applications => {
        this.appliedJobs = applications.map(app => app.jobId);
      });
    }
  }

  search() {
    if (!this.searchQuery.trim()) {
      this.filteredJobs = this.jobs;
      return;
    }

    this.jobService.searchJobs(this.searchQuery).subscribe(jobs => {
      this.filteredJobs = jobs;
    });
  }

  applyJob(jobId: string) {
    if (!this.currentUser) return;

    this.jobService.applyForJob(jobId, this.currentUser.id, 'I am interested in this position').subscribe(() => {
      this.appliedJobs.push(jobId);
      alert('Candidature envoyée avec succès!');
    });
  }

  hasApplied(jobId: string): boolean {
    return this.appliedJobs.includes(jobId);
  }
}
