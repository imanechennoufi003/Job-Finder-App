import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User as UserService, UserProfile, Experience } from '../../../services/user';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private userService = inject(UserService);
  private authService = inject(Auth);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  profile: UserProfile | null = null;
  currentUser = this.authService.getCurrentUser();
  isOwnProfile = false;
  showAddExperienceForm = false;
  experienceForm: FormGroup;

  constructor() {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      isCurrent: [false],
      description: ['']
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log('Loading profile for userId:', userId);
    if (userId) {
      this.userService.getUserProfile(userId).subscribe(profile => {
        console.log('Profile loaded:', profile);
        this.profile = profile || null;
        this.isOwnProfile = userId === this.currentUser?.id;
      });
    }
  }

  toggleAddExperienceForm() {
    this.showAddExperienceForm = !this.showAddExperienceForm;
    if (!this.showAddExperienceForm) {
      this.experienceForm.reset();
    }
  }

  addExperience() {
    if (this.experienceForm.valid && this.profile) {
      const newExperience: Experience = {
        id: Date.now().toString(), // Génère un ID temporaire
        title: this.experienceForm.value.title,
        company: this.experienceForm.value.company,
        location: this.experienceForm.value.location,
        startDate: new Date(this.experienceForm.value.startDate),
        endDate: this.experienceForm.value.endDate ? new Date(this.experienceForm.value.endDate) : undefined,
        isCurrent: this.experienceForm.value.isCurrent,
        description: this.experienceForm.value.description
      };

      if (!this.profile.experience) {
        this.profile.experience = [];
      }
      this.profile.experience.push(newExperience);
      this.experienceForm.reset();
      this.showAddExperienceForm = false;
      
      // TODO: Envoyer au backend
      // this.userService.addExperience(newExperience).subscribe(...)
    }
  }

  deleteExperience(index: number) {
    if (this.profile && this.profile.experience) {
      this.profile.experience.splice(index, 1);
      // TODO: Envoyer au backend
      // this.userService.deleteExperience(experience.id).subscribe(...)
    }
  }
}
