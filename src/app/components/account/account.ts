import { Component, inject } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabsModule } from 'primeng/tabs'; 
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OrdersHistory } from '../orders-history/orders-history';
import { UpdateDetails } from '../update-details/update-details';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [Login,Register,OrdersHistory,UpdateDetails,SelectButtonModule,TabsModule,ButtonModule,FormsModule,CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  public authService = inject(AuthService);
  
  // משתנה שומר את הטאב הנבחר עבור משתמש לא מחובר
  activeTab: string = 'login';

  ngOnInit(): void {
    // אם המשתמש עדיין לא מחובר, הטאב ברירת מחדל הוא login
    if (!this.authService.isLoggedIn()) {
      this.activeTab = 'login';
    }
  }

  logout() {
    this.authService.logout();
  }
  isAdmin = this.authService.isAdmin();
}
