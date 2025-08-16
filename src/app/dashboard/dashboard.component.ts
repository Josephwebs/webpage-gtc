import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { RecentTasksComponent } from './recent-tasks/recent-tasks.component';
import { TeamActivityComponent } from './team-activity/team-activity.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { FiltersBarComponent } from './filters-bar/filters-bar.component';
import { TaskService } from '../services/task.service';
import { PrioritySummaryComponent } from './priority-summary/priority-summary.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    RecentTasksComponent,
    TeamActivityComponent,
    QuickLinksComponent,
    FiltersBarComponent,
    PrioritySummaryComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  kpis :Kpi[] = [
    { title: 'Total', value: 0, subtitle: 'Tareas', trendText: '', trendType: 'up', accent: 'blue' },
    { title: 'Completadas', value: 0, subtitle: '', trendText: '', trendType: 'up', accent: 'green' },
    { title: 'En Progreso', value: 0, subtitle: '', trendText: '', trendType: 'up', accent: 'orange' },
    { title: 'Vencidas', value: 0, subtitle: '', trendText: '', trendType: 'down', accent: 'violet' }
  ];

  constructor(private tasks: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const all = this.tasks.listAll();
    const completed = all.filter(t => t.status === 'Completado').length;
    const inProgress = all.filter(t => t.status === 'En Progreso').length;
    const overdue = all.filter(t => t.status !== 'Completado' && new Date(t.dueDate) < new Date()).length;
    this.kpis = [
      { title: 'Total', value: all.length, subtitle: 'Tareas', trendText: '', trendType: 'up', accent: 'blue' },
      { title: 'Completadas', value: completed, subtitle: '', trendText: '', trendType: 'up', accent: 'green' },
      { title: 'En Progreso', value: inProgress, subtitle: '', trendText: '', trendType: 'up', accent: 'orange' },
      { title: 'Vencidas', value: overdue, subtitle: '', trendText: '', trendType: 'down', accent: 'violet' }
    ];
    this.cdr.detectChanges();
  }
}
