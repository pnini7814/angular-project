import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar'; // ייבוא ה-Toolbar
import { ButtonModule } from 'primeng/button';   // ייבוא ה-Button
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    ToolbarModule, 
    ButtonModule, 
    RouterOutlet, 
    RouterModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
    }
  }
}