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
          title: 'Reunión de planificación semanal',
          category: 'Reunión Interna',
          dueDate: '2025-12-27',
          durationHours: 2,
          priority: 'medium',
          status: 'Pendiente',
          assignedTo: 1,
          createdAt: '2025-12-01',
          updatedAt: '2025-12-01',
          boardId: 0
        },
        {
          id: 2,
          title: 'Actualizar documentación del proceso',
          category: 'Flujo de Trabajo',
          dueDate: '2026-01-04',
          durationHours: 6,
          priority: 'low',
          status: 'Pendiente',
          assignedTo: 2,
          createdAt: '2025-12-02',
          updatedAt: '2025-12-02',
          boardId: 0
        },
        {
          id: 3,
          title: 'Seguimiento facturas pendientes',
          category: 'Administrativo',
          dueDate: '2025-12-24',
          durationHours: 3,
          priority: 'urgent',
          status: 'En Progreso',
          assignedTo: 1,
          createdAt: '2025-12-03',
          updatedAt: '2025-12-03',
          boardId: 0
        },
        {
          id: 4,
          title: 'Llamada con proveedor de software',
          category: 'Compromiso Cliente',
          dueDate: '2025-12-28',
          durationHours: 1,
          priority: 'medium',
          status: 'Pendiente',
          assignedTo: 2,
          createdAt: '2025-12-04',
          updatedAt: '2025-12-04',
          boardId: 0
        },
        {
          id: 5,
          title: 'Análisis de rendimiento Q4',
          category: 'Flujo de Trabajo',
          dueDate: '2026-01-09',
          durationHours: 8,
          priority: 'high',
          status: 'Completado',
          assignedTo: 1,
          createdAt: '2025-12-05',
          updatedAt: '2025-12-05',
          boardId: 0
        },
        {
          id: 6,
          title: 'Preparar informe anual',
          category: 'Administrativo',
          dueDate: '2025-12-20',
          durationHours: 5,
          priority: 'high',
          status: 'Completado',
          assignedTo: 1,
          createdAt: '2025-11-30',
          updatedAt: '2025-11-30',
          boardId: 0
        },
        {
          id: 7,
          title: 'Revisión de presupuesto',
          category: 'Administrativo',
          dueDate: '2025-12-22',
          durationHours: 4,
          priority: 'medium',
          status: 'Completado',
          assignedTo: 2,
          createdAt: '2025-11-29',
          updatedAt: '2025-11-29',
          boardId: 0
        }
      ];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
  }

  listRecent(): Task[] {
    const toTime = (s?: string) => s ? new Date(s).getTime() : 0;
    return [...this.tasks]
      .sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt))
      .slice(0, 7);
  }            

  listAll(filters?: Partial<{ assignedTo: number; status: Task['status']; priority: Task['priority']; category: Task['category']; }>): Task[] {
    return this.tasks.filter(t => {
      if (filters?.assignedTo && t.assignedTo !== filters.assignedTo) return false;
      if (filters?.status && t.status !== filters.status) return false;
      if (filters?.priority && t.priority !== filters.priority) return false;
      if (filters?.category && t.category !== filters.category) return false;
      return true;
    });
  }

  create(task: Task) {
    task.id = Math.max(0, ...this.tasks.map(t => t.id)) + 1;
    task.createdAt = new Date().toISOString();
    task.updatedAt = task.createdAt;
    this.tasks.push(task);
    this.save();
  }

  update(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      task.updatedAt = new Date().toISOString();
      this.tasks[index] = task;
      this.save();
    }
  }

  moveStatus(taskId: number, newStatus: Task['status']) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      task.updatedAt = new Date().toISOString();
      this.save();
    }
  }

  upsertTask(task: Task) {
    if (task.id) {
      this.update(task);
    } else {
      this.create(task);
    }
  }
}
