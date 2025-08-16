import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, RouterModule],
  templateUrl: './quick-links.component.html',
  styleUrl: './quick-links.component.scss'
})
export class QuickLinksComponent {
  constructor(private dialog: MatDialog) {}

  placeholder() {
    this.dialog.open(SimpleDialog);
  }
}

@Component({
  standalone: true,
  template: `<div style="padding:24px">Funcionalidad en construcción</div>`
})
class SimpleDialog {}
