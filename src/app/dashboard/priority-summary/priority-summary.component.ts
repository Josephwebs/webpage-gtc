import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-priority-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-summary.component.html',
  styleUrl: './priority-summary.component.scss'
})
export class PrioritySummaryComponent implements OnInit {
  summary = { urgent: 0, high: 0, medium: 0, low: 0 };

  constructor(private tasks: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const all = this.tasks.listAll();
    const urgent = all.filter(t => t.priority === 'urgent').length;
    const high = all.filter(t => t.priority === 'high').length;
    const medium = all.filter(t => t.priority === 'medium').length;
    const low = all.filter(t => t.priority === 'low').length;
    this.summary = { urgent, high, medium, low };
    this.cdr.detectChanges();
  }
}
