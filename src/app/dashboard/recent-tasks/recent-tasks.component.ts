import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../models/task';
import { User } from '../../models/user';

@Component({
  selector: 'app-recent-tasks',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './recent-tasks.component.html',
  styleUrl: './recent-tasks.component.scss'
})
export class RecentTasksComponent implements OnInit {
  tasks: Task[] = [];
  users: Record<number, User> = {};

  constructor(private taskService: TaskService, private auth: AuthService) {}

  ngOnInit() {
    this.tasks = this.taskService.listRecent().slice(0, 7);
    this.auth.getUsers().forEach(u => this.users[u.id] = u);
  }

  userInitials(id: number) {
    return this.users[id]?.initials || '';
  }
}
