import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { MetricSection } from '../../../core/models';
import { MetricCardComponent } from '../../../shared/components/metric-card/metric-card.component';

@Component({
  selector: 'app-metric-section',
  standalone: true,
  imports: [NgClass, MetricCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = section();
    <div>
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <h2 class="text-xl font-bold">{{ s.title }}</h2>
        <p class="text-sm text-base-content/60">
          {{ s.counts.total }} metrics monitored ·
          <span class="text-error font-medium">{{ s.counts.critical }} critical</span> ·
          <span class="text-warning font-medium">{{ s.counts.warning }} warning</span> ·
          <span class="text-success font-medium">{{ s.counts.normal }} normal</span>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4" [ngClass]="gridClass()">
        @for (metric of s.metrics; track metric.id) {
          <app-metric-card [metric]="metric" />
        }
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class MetricSectionComponent {
  readonly section = input.required<MetricSection>();
  readonly gridClass = computed(() =>
    this.section().metrics.length <= 4
      ? 'md:grid-cols-4'
      : 'md:grid-cols-5'
  );
}
