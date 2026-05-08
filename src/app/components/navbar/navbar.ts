import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth-service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, Menubar, ButtonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Products', icon: 'pi pi-shopping-bag', routerLink: '/products' },
      { label: 'My Account', icon: 'pi pi-user', routerLink: '/account' },
      { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' }
    ];
  }
  authService = inject(AuthService);
  private router = inject(Router);

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
