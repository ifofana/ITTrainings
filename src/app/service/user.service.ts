import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${API_URL}/training/users/`, user);
  }

  retrieveAllUsers() {
    return this.http.get<User>(`${API_URL}/training/users`);
  }

  getUserById(id: number) {
    return this.http.get(`${API_URL}/training/users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`${API_URL}/training/users/${user.id}`, user);
  }
  
  deleteUser(id: number) {
    return this.http.delete(`${API_URL}/training/users/${id}`);
  }
}
