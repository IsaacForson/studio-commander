import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { MetricSectionComponent } from './components/metric-section.component';

@Component({
  selector: 'app-key-metrics',
  standalone: true,
  imports: [MetricSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6 pb-6">
      @for (section of sections; track $index) {
        <app-metric-section [section]="section" />
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class KeyMetricsComponent {
  private readonly mockData = inject(MockDataService);
  readonly sections = this.mockData.getMetricSections();
}
