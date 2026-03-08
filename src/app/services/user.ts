import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  backgroundImage?: string;
  connections?: number;
  followers?: number;
  posts?: number;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class User {
  private userProfilesSubject = new BehaviorSubject<Map<string, UserProfile>>(new Map());
  public userProfiles$ = this.userProfilesSubject.asObservable();

  private mockUsers: UserProfile[] = [
    {
      id: '1',
      firstName: 'IMANE',
      lastName: 'CHENNOUFI',
      email: 'imane@example.com',
      headline: 'Lead UX/UI Designer & Frontend Developer',
      bio: 'Designing beautiful & intuitive digital experiences. Passionate about user-centered design and modern web technologies.',
      location: 'Sidi bennour, Morocco',
      website: 'imanechennoufi.com',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=IMANE&scale=95',
      connections: 500,
      followers: 1200,
      posts: 45,
      skills: ['UI/UX Design', 'Figma', 'React', 'Angular', 'TypeScript', 'Web Design', 'CSS3'],
      experience: [
        {
          id: '1',
          title: 'frontend developer',
          company: 'Design ',
          location: 'Sidi bennour, Morocco',
          startDate: new Date(2025, 11),
          isCurrent: true,
          description: 'Leading design initiatives for global clients'
        }
      ],
      education: [
        {
          id: '1',
          school: 'est sb',
          degree: 'DUT',
          field: 'Génie Informatique',
          startDate: new Date(2024, 0),
          endDate: new Date(2026, 5)
        }
      ]
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      headline: 'Product Manager',
      bio: 'Building products that users love',
      location: 'New York, NY',
      website: 'janesmith.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      connections: 800,
      followers: 2100,
      posts: 67,
      skills: ['Product Management', 'Strategy', 'Analytics', 'Leadership'],
      experience: [
        {
          id: '2',
          title: 'Product Manager',
          company: 'Startup Inc',
          location: 'New York',
          startDate: new Date(2021, 0),
          isCurrent: true,
          description: 'Managing core product features'
        },
        {
          id: '3',
          title: 'Associate Product Manager',
          company: 'Big Tech',
          location: 'New York',
          startDate: new Date(2019, 0),
          endDate: new Date(2021, 0),
          isCurrent: false,
          description: 'Worked on mobile products'
        }
      ],
      education: [
        {
          id: '2',
          school: 'MIT',
          degree: 'Master',
          field: 'Business Administration',
          startDate: new Date(2017, 0),
          endDate: new Date(2019, 5)
        }
      ]
    },
    {
      id: '3',
      firstName: 'nissrine',
      lastName: 'elidrissi',
      email: 'michael@example.com',
      headline: 'UX/UI Designer',
      bio: 'Creating beautiful and functional experiences',
      location: 'Los Angeles, CA',
      website: 'michaeljohnson.design',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      connections: 450,
      followers: 950,
      posts: 32,
      skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'CSS'],
      experience: [
        {
          id: '4',
          title: 'Senior UX Designer',
          company: 'Design Studio',
          location: 'Los Angeles',
          startDate: new Date(2019, 0),
          isCurrent: true,
          description: 'Leading design system development'
        }
      ],
      education: [
        {
          id: '3',
          school: 'California Institute of the Arts',
          degree: 'Bachelor',
          field: 'Graphic Design',
          startDate: new Date(2015, 0),
          endDate: new Date(2019, 5)
        }
      ]
    }
  ];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const profiles = new Map<string, UserProfile>();
    this.mockUsers.forEach(user => {
      profiles.set(user.id, user);
    });
    console.log('Initialized profiles:', Array.from(profiles.keys()));
    this.userProfilesSubject.next(profiles);
  }

  getUserProfile(userId: string): Observable<UserProfile | undefined> {
    const profiles = this.userProfilesSubject.value;
    console.log('Looking for userId:', userId, 'Available keys:', Array.from(profiles.keys()));
    const profile = profiles.get(userId);
    console.log('Found profile:', profile);
    
    return new Observable(observer => {
      observer.next(profile);
      observer.complete();
    });
  }

  updateUserProfile(userId: string, profile: Partial<UserProfile>): Observable<UserProfile> {
    return new Observable(observer => {
      setTimeout(() => {
        const profiles = this.userProfilesSubject.value;
        const existingUser = profiles.get(userId);
        if (existingUser) {
          const updatedUser = { ...existingUser, ...profile };
          profiles.set(userId, updatedUser);
          this.userProfilesSubject.next(profiles);
          observer.next(updatedUser);
        }
        observer.complete();
      }, 300);
    });
  }

  getAllUsers(): Observable<UserProfile[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const profiles = this.userProfilesSubject.value;
        observer.next(Array.from(profiles.values()));
        observer.complete();
      }, 300);
    });
  }

  searchUsers(query: string): Observable<UserProfile[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const profiles = this.userProfilesSubject.value;
        const results = Array.from(profiles.values()).filter(user =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(results);
        observer.complete();
      }, 300);
    });
  }
}
