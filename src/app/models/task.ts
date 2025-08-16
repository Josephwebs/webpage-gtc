export interface Task {
  id: number;
  boardId: number;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  status: 'Pendiente' | 'En Progreso' | 'Completado';
}
