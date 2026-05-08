// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import {  } from '../models/user.model';

// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   // Set your API base URL here
//   private baseUrl = 'https://localhost:44367';

//   constructor(private http: HttpClient) {}

//   get<T>(path: string, params?: any): Observable<T> {
//     return this.http.get<T>(`${this.baseUrl}/${path}`, { params });
//   }

//   post<T>(path: string, body: any): Observable<T> {
//     return this.http.post<T>(`${this.baseUrl}/${path}`, body);
//   }

//   put<T>(path: string, body: any): Observable<T> {
//     return this.http.put<T>(`${this.baseUrl}/${path}`, body);
//   }

//   delete<T>(path: string): Observable<T> {
//     return this.http.delete<T>(`${this.baseUrl}/${path}`);
//   }

//   // User specific methods
//   login(loginUser: LoginUserDTO): Observable<UserDTO> {
//     return this.post<UserDTO>(`api/users/login`, loginUser);
//   }

//   register(user: UserDTO): Observable<UserDTO> {
//     return this.post<UserDTO>(`api/users`, user);
//   }

//   getUsers(): Observable<UserDTO[]> {
//     return this.get<UserDTO[]>('api/users');
//   }

//   getUserById(id: number): Observable<UserDTO> {
//     return this.get<UserDTO>(`api/users/${id}`);
//   }

//   updateUser(id: number, user: UserDTO): Observable<any> {
//     return this.put(`api/users/${id}`, user);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.delete(`api/users/${id}`);
//   }
// }
