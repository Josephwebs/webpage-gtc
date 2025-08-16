import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'jose alcantara', initials: 'JA', email: 'admin@test.com', role: 'admin', password: '1234' },
    { id: 2, name: 'ana diaz', initials: 'AD', email: 'user@test.com', role: 'user', password: '1234' }
  ];

  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.saveUsers();
    }
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      this.currentUser$.next(JSON.parse(session));
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
      this.currentUser$.next(user);
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
    const user: User = {
      id,
      name: email.split('@')[0],
      initials: email.slice(0, 2).toUpperCase(),
      email,
      role: 'user',
      password
    };
    this.users.push(user);
    this.saveUsers();
    this.currentUser$.next(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return true;
  }

  logout() {
    this.currentUser$.next(null);
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser$.value;
  }
}
