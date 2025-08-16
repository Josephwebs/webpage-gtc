export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Pendiente' | 'En Progreso' | 'Completado';
}
