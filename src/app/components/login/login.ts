import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { LoginUser } from '../../models/login-user';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private usersService = inject(UsersService);
  loginData = {
    email: '',
    password: ''
  };

  onLogin() {
    if (this.loginData.email && this.loginData.password) {
      const user: LoginUser = {
        email: this.loginData.email,
        password: this.loginData.password
      };
      
      const loggedUser = this.usersService.login(user);
      loggedUser.subscribe({
        next: (user) => {
          this.authService.login(user);
        },
        error: (error) => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Login Failed', 
            detail: 'Invalid email or password.' 
          });
        }
      });
      
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Login Successful', 
        detail: 'Welcome back!', 
        life: 3000 
      });
    } else {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Login Failed', 
        detail: 'Please enter valid email and password.' 
      });
    }
  }
}
