import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { TeamService } from '../../services/team.service';

const SESSION_KEY = 'sessionUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private team: TeamService) {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const user = this.findUser(stored);
      if (user) {
        this.currentUser$.next(user);
      }
    }
  }

  login(username: string, password: string): Observable<User | null> {
    const user = this.validate(username, password);
    if (user) {
      this.currentUser$.next(user);
      localStorage.setItem(SESSION_KEY, user.email);
      return of(user);
    }
    return of(null);
  }

  logout() {
    this.currentUser$.next(null);
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }

  getUsers(): User[] {
    return this.team.list();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser$.value;
  }

  private validate(username: string, password: string): User | null {
    if (username === 'admin' && password === 'admin') {
      return {
        id: 0,
        name: 'Administrador',
        initials: 'AD',
        email: 'admin',
        role: 'admin',
        password: 'admin'
      };
    }
    return this.team
      .list()
      .find(u => (u.email === username || u.name === username) && u.password === password) || null;
  }

  private findUser(username: string): User | null {
    if (username === 'admin') {
      return {
        id: 0,
        name: 'Administrador',
        initials: 'AD',
        email: 'admin',
        role: 'admin',
        password: 'admin'
      };
    }
    return this.team.list().find(u => u.email === username || u.name === username) || null;
  }
}
