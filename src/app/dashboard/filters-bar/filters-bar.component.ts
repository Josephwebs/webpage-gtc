import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.scss'
})
export class FiltersBarComponent {
  constructor(private dialog: MatDialog, private tasks: TaskService, private auth: AuthService) {}

  openFilters() {
    this.dialog.open(SimpleDialog);
  }

  newTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { task: { id: 0, title: '', assignedTo: 1, priority: 'medium', category: 'Flujo de Trabajo', status: 'Pendiente', dueDate: '', createdAt: '', updatedAt: '' }, users: this.auth.getUsers() }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks.create(result);
      }
    });
  }
}

@Component({
  standalone: true,
  template: `<div style="padding:24px">Filtros en construcción</div>`
})
class SimpleDialog {}
