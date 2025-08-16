import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Task } from '../models/task';
import { User } from '../models/user';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    TaskFormComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  statuses: Task['status'][] = ['Pendiente', 'En Progreso', 'Completado'];
  users: User[] = [];
  filterUser = '';
  filterStatus = '';

  constructor(
    private tasksService: TaskService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.users = this.auth.getUsers();
  }

  loadTasks() {
    this.tasks = this.tasksService.getTasks();
  }

  get filteredTasks() {
    return this.tasks.filter(
      (t) => (!this.filterUser || t.assignedTo === this.filterUser) && (!this.filterStatus || t.status === this.filterStatus)
    );
  }

  get tasksByStatus() {
    const filtered = this.filteredTasks;
    return {
      Pendiente: filtered.filter((t) => t.status === 'Pendiente'),
      'En Progreso': filtered.filter((t) => t.status === 'En Progreso'),
      Completado: filtered.filter((t) => t.status === 'Completado')
    } as Record<Task['status'], Task[]>;
  }

  drop(event: CdkDragDrop<Task[]>, status: Task['status']) {
    const task = event.item.data as Task;
    this.tasksService.updateStatus(task.id, status);
    this.loadTasks();
  }

  statusClass(status: Task['status']) {
    return status.replace(/\s+/g, '-').toLowerCase();
  }

  priorityClass(priority: Task['priority']) {
    return priority.toLowerCase();
  }

  openTask(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        task:
          task ?? {
            id: 0,
            title: '',
            description: '',
            dueDate: '',
            assignedTo: '',
            priority: 'Media',
            status: 'Pendiente'
          },
        users: this.users
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.upsertTask(result);
        this.loadTasks();
      }
    });
  }
}
