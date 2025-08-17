import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeamService } from '../services/team.service';
import { User } from '../models/user';
import { TeamFormComponent } from './team-form.component';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.css'
})
export class TeamManagementComponent implements OnInit {
  members: User[] = [];
  displayedColumns = ['name', 'email', 'role', 'actions'];

  constructor(private team: TeamService, private dialog: MatDialog) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.members = this.team.list();
  }

  add() {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      data: { member: { id: 0, name: '', email: '', role: 'user', password: '', initials: '' } }
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.team.create(result);
        this.load();
      }
    });
  }

  edit(member: User) {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      data: { member: { ...member } }
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.team.update(result);
        this.load();
      }
    });
  }

  delete(member: User) {
    if (confirm('¿Eliminar miembro?')) {
      this.team.remove(member.id);
      this.load();
    }
  }
}
