import { Injectable } from '@angular/core';
import { Task } from '../models/task';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    const data = localStorage.getItem(TASKS_KEY);
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [
        {
          id: 1,
          title: 'Reunión con cliente',
          description: 'Definir alcance del proyecto',
          dueDate: '2025-08-20',
          assignedTo: 'Admin',
          priority: 'Alta',
          status: 'Pendiente',
          boardId: 1
        },
        {
          id: 2,
          boardId: 1,
          title: 'Diseñar UI',
          description: 'Bocetar pantallas',
          dueDate: '2025-09-01',
          assignedTo: 'Usuario',
          priority: 'Media',
          status: 'En Progreso'
        },
        {
          id: 3,
          title: 'Prepa rar propuesta',
          description: 'Enviar costos',
          dueDate: '2025-08-25',
          assignedTo: 'Admin',
          priority: 'Baja',
          status: 'Completado',
          boardId: 2
        }
      ];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  upsertTask(task: Task) {
    if (task.id) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
      }
    } else {
      task.id = Math.max(0, ...this.tasks.map((t) => t.id)) + 1;
      this.tasks.push(task);
    }
    this.save();
  }

  updateStatus(taskId: number, status: Task['status']) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      this.save();
    }
  }
}
