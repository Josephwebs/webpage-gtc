export interface Task {
  id: number;
  title: string;
  boardId: number; // Added to associate task with a board
  description: string;
  dueDate: string;
  assignedTo: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Pendiente' | 'En Progreso' | 'Completado';
} 
