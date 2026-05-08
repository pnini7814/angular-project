

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model'; 
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users-service';
import { MessageService } from 'primeng/api'; 
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-update-details',
  imports: [
    InputTextModule, 
    PasswordModule, 
    InputMaskModule, 
    ButtonModule, 
    FloatLabelModule, 
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './update-details.html',
  styleUrl: './update-details.scss',
})
export class UpdateDetails {
  constructor(private fb: FormBuilder, private usersService: UsersService, private messageService: MessageService, private router: Router) {
  }
  authService = inject(AuthService);
  user: User = this.authService.currentUser() || new User();
  
  onSubmit() {
    if (this.isFormValid()) {
      this.usersService.update(this.user.id, this.user).subscribe({
        next: (response) => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Update Successful', 
          detail: `${this.user.firstName}! Your account has been updated.`,
          life: 3000 
        });  
        this.authService.login(this.user); 
        },
        error: (error) => {
          console.error('Registration failed', error);
          console.error('Form is invalid');
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Form Invalid', 
            detail: 'Please check the fields and try again.' 
          });
        }
      });
    }
  }

  isFormValid(): boolean {
    return !!(
      this.user.email && 
      this.user.firstName && 
      this.user.lastName && 
      this.user.phoneNumber
    );
  }
}
