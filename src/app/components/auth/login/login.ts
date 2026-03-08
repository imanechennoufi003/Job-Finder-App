import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isToggled = false;
  showAuthPanel = false;
  loginForm: FormGroup;
  signupForm: FormGroup;
  error = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  openAuth(isSignup: boolean = false): void {
    this.showAuthPanel = true;
    this.isToggled = isSignup;
    this.error = '';
  }

  closeAuth(): void {
    this.showAuthPanel = false;
    this.error = '';
  }

  toggleToSignup(event?: Event): void {
    if (event) event.preventDefault();
    this.isToggled = true;
    this.error = '';
  }

  toggleToLogin(event?: Event): void {
    if (event) event.preventDefault();
    this.isToggled = false;
    this.error = '';
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Identifiants invalides';
        }
      });
    }
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        this.error = 'Les mots de passe ne correspondent pas';
        return;
      }

      this.authService.register({
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.confirmPassword
      }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'inscription';
        }
      });
    }
  }
}
