import { Component, ChangeDetectionStrategy, input, signal, inject, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { MetricSection } from '../../../core/models';
import { MetricCardComponent } from '../../../shared/components/metric-card/metric-card.component';
import { TrendChartComponent } from './trend-chart.component';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-metric-section',
  standalone: true,
  imports: [NgClass, MetricCardComponent, TrendChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = section();
    <section class="bg-surface-elevated rounded-2xl border border-base-300/60 p-5 shadow-figma-soft lg:p-6">
      @if (s.title) {
        <div class="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 class="text-xl font-bold text-base-content">{{ s.title }}</h2>
          <p class="text-sm text-base-content/60">
            {{ s.counts.total }} metrics monitored ·
            <span class="font-medium text-error">{{ s.counts.critical }} critical</span> ·
            <span class="font-medium text-warning">{{ s.counts.warning }} warning</span> ·
            <span class="font-medium text-success">{{ s.counts.normal }} normal</span>
          </p>
        </div>
      }

      <div class="grid auto-rows-fr grid-cols-2 items-stretch gap-4" [ngClass]="gridClass()">
        @for (metric of s.metrics; track metric.id) {
          <app-metric-card
            [metric]="metric"
            [selected]="selectedMetricId() === metric.id"
            (select)="onMetricSelect($event)"
            class="animate-fade-in-up animate-stagger"
            [style.--stagger-index]="$index"
          />
        }
      </div>

      @if (selectedMetricId()) {
        <app-trend-chart class="mt-4 block animate-scale-in" [data]="trendData()" />
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class MetricSectionComponent {
  private readonly mockData = inject(MockDataService);

  readonly section = input.required<MetricSection>();
  readonly selectedMetricId = signal<string | null>(null);

  readonly trendData = computed(() =>
    this.mockData.getTrendChartData(this.selectedMetricId() ?? 'profit-loss'),
  );

  readonly gridClass = computed(() =>
    this.section().metrics.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5',
  );

  onMetricSelect(metricId: string): void {
    this.selectedMetricId.update(current => (current === metricId ? null : metricId));
  }
}
