import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'board', component: KanbanBoardComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamManagementComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'board' },
  { path: '**', redirectTo: 'board' }
];
