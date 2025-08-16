import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  currentUser?: User;

  constructor(private data: DataService, private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.data
      .getUsers()
      .find((u) => u.email === email && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    const existing = this.data.getUsers().find((u) => u.email === email);
    if (existing) {
      return false;
    }
    const user = this.data.addUser(email, password);
    this.loggedIn = true;
    this.currentUser = user;
    return true;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
