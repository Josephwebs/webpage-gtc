import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-team-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-activity.component.html',
  styleUrl: './team-activity.component.scss'
})
export class TeamActivityComponent implements OnInit {
  name = 'jose alcantara';
  initials = 'JA';
  inProgress = 0;
  completion = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const tasks = this.taskService.listAll({ assignedTo: 1 });
    const completed = tasks.filter(t => t.status === 'Completado').length;
    this.inProgress = tasks.filter(t => t.status === 'En Progreso').length;
    this.completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  }
}
