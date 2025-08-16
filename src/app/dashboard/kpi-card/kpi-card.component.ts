import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  @Input() title = '';
  @Input() value = 0;
  @Input() subtitle = '';
  @Input() trendText = '';
  @Input() trendType: 'up' | 'down' = 'up';
  @Input() accent: 'blue' | 'green' | 'orange' | 'violet' = 'blue';
}
