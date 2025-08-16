import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DataService } from '../services/data.service';
import { Task } from '../models/task';
import { Board } from '../models/board';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    TaskDialogComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  boardId!: number;
  tasks: Task[] = [];
  statuses: Task['status'][] = ['Pendiente', 'En Progreso', 'Completado'];

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.boards = this.data.getBoards();
    this.route.paramMap.subscribe((params) => {
      this.boardId = Number(params.get('id'));
      this.loadTasks();
    });
  }

  loadTasks() {
    this.tasks = this.data.getTasks(this.boardId);
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
    this.data.updateStatus(task.id, status);
    this.loadTasks();
  }

  statusClass(status: Task['status']) {
    return status.replace(/\s+/g, '-').toLowerCase();
  }

  openTask(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task:
          task ?? {
            id: 0,
            boardId: this.boardId,
            title: '',
            description: '',
            dueDate: '',
            assignedTo: '',
            status: 'Pendiente'
          },
        users: this.data.getUsers()
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.boardId = this.boardId;
        this.data.upsertTask(result);
        this.loadTasks();
      }
    });
  }
}
