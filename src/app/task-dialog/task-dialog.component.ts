import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../models/task';
import { User } from '../models/user';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {
  task: Task;
  users: User[];

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { task: Task; users: User[] }
  ) {
    this.task = data.task;
    this.users = data.users;
  }

  save() {
    this.dialogRef.close(this.task);
  }

  cancel() {
    this.dialogRef.close();
  }
}
