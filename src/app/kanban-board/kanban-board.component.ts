import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {
  tasks: Task[] = [];
  statuses: Task['status'][] = ['Pendiente', 'En Progreso', 'Completado'];
  users: User[] = [];

  constructor(
    private tasksService: TaskService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.users = this.auth.getUsers();
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.tasksService.listAll();
  }

  get tasksByStatus() {
    return {
      Pendiente: this.tasks.filter((t) => t.status === 'Pendiente'),
      'En Progreso': this.tasks.filter((t) => t.status === 'En Progreso'),
      Completado: this.tasks.filter((t) => t.status === 'Completado')
    } as Record<Task['status'], Task[]>;
  }

  drop(event: CdkDragDrop<Task[]>, status: Task['status']) {
    const task = event.item.data as Task;
    this.tasksService.moveStatus(task.id, status);
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
            assignedTo: 1,
            priority: 'medium',
            category: 'Flujo de Trabajo',
            status: 'Pendiente',
            createdAt: '',
            updatedAt: ''
          },
        users: this.auth.getUsers()
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.upsertTask(result);
        this.loadTasks();
      }
    });
  }

  userName(id: number) {
    return this.users.find(u => u.id === id)?.name || '';
  }
}

