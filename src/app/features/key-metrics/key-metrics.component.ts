import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { MetricSectionComponent } from './components/metric-section.component';
import { TrendChartComponent } from './components/trend-chart.component';

@Component({
  selector: 'app-key-metrics',
  standalone: true,
  imports: [MetricSectionComponent, TrendChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8">
      @for (section of sections; track section.title; let i = $index) {
        <app-metric-section [section]="section" />
        @if (i === 0) {
          <app-trend-chart [data]="trendData" />
        }
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class KeyMetricsComponent {
  private readonly mockData = inject(MockDataService);
  readonly sections = this.mockData.getMetricSections();
  readonly trendData = this.mockData.getTrendChartData();
}
