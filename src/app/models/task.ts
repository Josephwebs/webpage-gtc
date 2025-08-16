export interface Task {
  boardId: number;
  id: number;
  title: string;
  description?: string;
  status: 'Pendiente' | 'En Progreso' | 'Completado';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'Reunión Interna' | 'Flujo de Trabajo' | 'Administrativo' | 'Compromiso Cliente';
  dueDate: string; // ISO
  assignedTo: number; // userId
  durationHours?: number;
  createdAt: string;
  updatedAt: string;
}
