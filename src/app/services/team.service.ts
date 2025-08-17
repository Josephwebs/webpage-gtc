import { Injectable } from '@angular/core';
import { User } from '../models/user';

const TEAM_KEY = 'team';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private members: User[] = [];

  constructor() {
    const data = localStorage.getItem(TEAM_KEY);
    if (data) {
      this.members = JSON.parse(data);
    } else {
      this.members = [
        {
          id: 1,
          name: 'Katherine',
          email: 'katherine@example.com',
          password: '123',
          initials: 'K',
          role: 'admin'
        },
        {
          id: 2,
          name: 'Juan',
          email: 'juan@example.com',
          password: '123',
          initials: 'J',
          role: 'admin'
        }
      ];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(TEAM_KEY, JSON.stringify(this.members));
  }

  list(): User[] {
    return [...this.members];
  }

  create(member: User) {
    member.id = Math.max(0, ...this.members.map(m => m.id)) + 1;
    member.initials = this.getInitials(member.name);
    this.members.push(member);
    this.save();
  }

  update(member: User) {
    const index = this.members.findIndex(m => m.id === member.id);
    if (index > -1) {
      member.initials = this.getInitials(member.name);
      this.members[index] = member;
      this.save();
    }
  }

  remove(id: number) {
    this.members = this.members.filter(m => m.id !== id);
    this.save();
  }

  private getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
