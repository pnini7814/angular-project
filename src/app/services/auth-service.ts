import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal שמחזיק את המשתמש הנוכחי (או null אם לא מחובר)
  private currentUserSignal = signal<User | null>(null);

  // Signal לקריאה בלבד עבור שאר האפליקציה
  currentUser = this.currentUserSignal.asReadonly();

  // גזירת מצב ההתחברות אוטומטית (מתעדכן כש-currentUser משתנה)
  isLoggedIn = computed(() => !!this.currentUserSignal());
  isLogged(){
    return this.isLoggedIn;
  }
  // גזירת שם המשתמש לתצוגה נוחה
  userFullName = computed(() => {
    const user = this.currentUserSignal();
    return user ? `${user.firstName} ${user.lastName}` : 'Guest';
  });

  constructor(private router: Router) {
    // בדיקה אם יש משתמש שמור ב-LocalStorage בטעינת האפליקציה
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  login(user: User) {
    this.currentUserSignal.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/account']);
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/account']);
  }

  // בדיקה אם המשתמש הוא אדמין
  isAdmin = computed(() => this.currentUserSignal()?.isAdmin === true);
}