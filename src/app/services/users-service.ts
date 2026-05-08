import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginUser } from '../models/login-user';
import { Order } from '../models/order.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://localhost:44313';

  constructor(private http: HttpClient) {}

  getUsers<User>(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users`);
  }
  getUserById<User>(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`);
  }

  register<User>(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/users`, user);
  }
  login<LoginUser>(user: LoginUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/users/login`, user);
  } 

  update<User>(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/users/${id}`, user);
  }

  getUserOrders(userId: number) {
    return this.http.get<Order[]>(`${this.baseUrl}/api/users/${userId}/orders`);
  }

}
