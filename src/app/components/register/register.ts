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
@Component({
  selector: 'app-register',
  standalone: true,
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
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  constructor(private fb: FormBuilder, private usersService: UsersService, private messageService: MessageService, private router: Router) {
  }
  newUser: User = new User();
  onSubmit() {
    if (this.isFormValid()) {
      
      this.usersService.register(this.newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.messageService.add({ 
          severity: 'success', 
          summary: 'Registration Successful', 
          detail: `Welcome, ${this.newUser.firstName}! Your account has been created.`,
          life: 3000 
          });
          this.router.navigate(['/account']); 
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
      this.newUser.email && 
      this.newUser.firstName && 
      this.newUser.lastName && 
      this.newUser.password.length >= 6
    );
  }
}
