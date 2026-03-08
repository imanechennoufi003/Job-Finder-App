import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
  postedDate: Date;
  deadline?: Date;
  postedBy: string;
  applicants?: number;
  logo?: string;
  imageUrl?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  appliedDate: Date;
  status: 'applied' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  coverLetter?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Job {
  private jobsSubject = new BehaviorSubject<JobPosting[]>([]);
  public jobs$ = this.jobsSubject.asObservable();

  private applicationsSubject = new BehaviorSubject<JobApplication[]>([]);
  public applications$ = this.applicationsSubject.asObservable();

  private mockJobs: JobPosting[] = [
    {
      id: '1',
      title: 'Senior Angular Developer',
      company: 'Microsoft',
      location: 'San Francisco, CA',
      description: 'We are looking for an experienced Angular developer to join our team.',
      requirements: ['5+ years Angular', 'TypeScript', 'RxJS', 'Material Design'],
      salary: '$120k - $150k',
      jobType: 'Full-time',
      postedDate: new Date(),
      postedBy: '1',
      applicants: 15,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Oracle',
      location: 'New York, NY',
      description: 'Join our growing team building the next big thing in cloud computing.',
      requirements: ['Node.js', 'React', 'MongoDB', 'AWS'],
      salary: '$100k - $130k',
      jobType: 'Full-time',
      postedDate: new Date(),
      postedBy: '2',
      applicants: 25,
      logo: 'https://www.oracle.com/a/ocom/img/cb71/oracle-logo.png',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'Capgemini',
      location: 'Los Angeles, CA',
      description: 'Creative designer needed for exciting digital transformation projects.',
      requirements: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
      salary: '$80k - $110k',
      jobType: 'Full-time',
      postedDate: new Date(),
      postedBy: '3',
      applicants: 8,
      logo: 'https://www.capgemini.com/ca-en/wp-content/themes/capgemini-komodo/assets/images/logo.svg',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: '4',
      title: 'Web Developer (Freelance)',
      company: 'Remote Startup',
      location: 'Remote',
      description: 'Looking for talented web developers for various short-term and long-term projects. Flexible hours, work from anywhere!',
      requirements: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
      salary: '$30/hr - $60/hr',
      jobType: 'Freelance',
      postedDate: new Date(),
      postedBy: '4',
      applicants: 42,
      logo: 'https://api.dicebear.com/7.x/icons/svg?seed=freelance',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    }
  ];

  constructor() {
    this.jobsSubject.next(this.mockJobs);
  }

  getJobs(): Observable<JobPosting[]> {
    return this.jobs$;
  }

  getJobById(jobId: string): Observable<JobPosting | undefined> {
    return new Observable(observer => {
      setTimeout(() => {
        const job = this.mockJobs.find(j => j.id === jobId);
        observer.next(job);
        observer.complete();
      }, 300);
    });
  }

  searchJobs(query: string): Observable<JobPosting[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const results = this.mockJobs.filter(job =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(results);
        observer.complete();
      }, 300);
    });
  }

  postJob(job: Omit<JobPosting, 'id' | 'postedDate' | 'applicants'>): Observable<JobPosting> {
    return new Observable(observer => {
      setTimeout(() => {
        const newJob: JobPosting = {
          ...job,
          id: Date.now().toString(),
          postedDate: new Date(),
          applicants: 0
        };
        this.mockJobs.push(newJob);
        this.jobsSubject.next([...this.mockJobs]);
        observer.next(newJob);
        observer.complete();
      }, 300);
    });
  }

  applyForJob(jobId: string, userId: string, coverLetter?: string): Observable<JobApplication> {
    return new Observable(observer => {
      setTimeout(() => {
        const application: JobApplication = {
          id: Date.now().toString(),
          jobId,
          userId,
          appliedDate: new Date(),
          status: 'applied',
          coverLetter
        };
        const applications = this.applicationsSubject.value;
        applications.push(application);
        this.applicationsSubject.next([...applications]);
        observer.next(application);
        observer.complete();
      }, 300);
    });
  }

  getUserApplications(userId: string): Observable<JobApplication[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const userApplications = this.applicationsSubject.value.filter(app => app.userId === userId);
        observer.next(userApplications);
        observer.complete();
      }, 300);
    });
  }


  getApplicationsByJob(jobId: string): Observable<JobApplication[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const jobApplications = this.applicationsSubject.value.filter(app => app.jobId === jobId);
        observer.next(jobApplications);
        observer.complete();
      }, 300);
    });
  }
}
