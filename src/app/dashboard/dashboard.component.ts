import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { RecentTasksComponent } from './recent-tasks/recent-tasks.component';
import { TeamActivityComponent } from './team-activity/team-activity.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { FiltersBarComponent } from './filters-bar/filters-bar.component';
import { TaskService } from '../services/task.service';
import { Kpi } from '../models/kpi';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    RecentTasksComponent,
    TeamActivityComponent,
    QuickLinksComponent,
    FiltersBarComponent
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

  constructor(private tasks: TaskService) {}

  ngOnInit() {
    const all = this.tasks.listAll();
    const completed = all.filter(t => t.status === 'Completado').length;
    const inProgress = all.filter(t => t.status === 'En Progreso').length;
    const overdue = all.filter(t => t.status !== 'Completado' && new Date(t.dueDate) < new Date()).length;
    this.kpis[0].value = all.length;
    this.kpis[1].value = completed;
    this.kpis[2].value = inProgress;
    this.kpis[3].value = overdue;
  }
}
