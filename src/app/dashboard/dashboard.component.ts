import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../services/data.service';
import { Board } from '../models/board';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  boards: Board[] = [];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.boards = this.data.getBoards();
  }
}
