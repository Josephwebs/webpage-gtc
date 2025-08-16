import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class DataService {
  private users: User[] = [
    {
      id: 1,
      name: 'Katherine',
      email: 'katherine@example.com',
      password: '123',
      initials: '',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Juan',
      email: 'juan@example.com',
      password: '123',
      initials: '',
      role: 'admin',
    },
  ];

  private boards: Board[] = [
    { id: 1, name: 'Interno' },
    { id: 2, name: 'Cliente A' },
  ];

  private tasks: Task[] = [
    {
      id: 1,
      boardId: 1,
      title: 'Reunión con cliente',
      description: 'Definir alcance del proyecto',
      dueDate: '2025-08-20',
      assignedTo: 1,
      status: 'Pendiente',
      priority: 'high',
      category: 'Reunión Interna',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 2,
      boardId: 1,
      title: 'Diseñar UI',
      description: 'Bocetar pantallas',
      dueDate: '2025-09-01',
      assignedTo: 2,
      status: 'En Progreso',
      priority: 'high',
      category: 'Reunión Interna',
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 3,
      boardId: 2,
      title: 'Preparar propuesta',
      description: 'Enviar costos',
      dueDate: '2025-08-25',
      assignedTo: 1,
      status: 'Completado',
      priority: 'high',
      category: 'Reunión Interna',
      createdAt: '',
      updatedAt: ''
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  addUser(email: string, password: string): User {
    const id = Math.max(0, ...this.users.map((u) => u.id)) + 1;
    const user: User = {
      id,
      name: email.split('@')[0],
      email,
      password,
      initials: '',
      role: 'admin',
    };
    this.users.push(user);
    return user;
  }

  getBoards(): Board[] {
    return this.boards;
  }

  getBoard(id: number): Board | undefined {
    return this.boards.find((b) => b.id === id);
  }

  getTasks(boardId: number): Task[] {
    return this.tasks.filter((t) => t.boardId === boardId);
  }

  upsertTask(task: Task) {
    if (task.id) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
      }
    } else {
      const id = Math.max(0, ...this.tasks.map((t) => t.id)) + 1;
      task.id = id;
      this.tasks.push(task);
    }
  }

  updateStatus(taskId: number, status: Task['status']) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
    }
  }
}
