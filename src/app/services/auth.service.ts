import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];
  private loggedIn = false;
  currentUser?: User;

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        { id: 1, name: 'Admin', email: 'admin@test.com', password: '1234' },
        { id: 2, name: 'Usuario', email: 'user@test.com', password: '1234' }
      ];
      this.saveUsers();
    }
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      this.currentUser = JSON.parse(session);
      this.loggedIn = true;
    }
  }

  private saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
  }

  getUsers() {
    return this.users;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (this.users.some((u) => u.email === email)) {
      return false;
    }
    const id = Math.max(0, ...this.users.map((u) => u.id)) + 1;
    const user: User = { id, name: email.split('@')[0], email, password };
    this.users.push(user);
    this.saveUsers();
    this.loggedIn = true;
    this.currentUser = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return true;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = undefined;
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
