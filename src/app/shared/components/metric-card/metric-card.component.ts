import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Metric, MetricStatus } from '../../../core/models';
import { GaugeChartComponent } from '../gauge-chart/gauge-chart.component';
import { ActionButtonComponent } from '../action-button/action-button.component';

const BORDER_MAP: Record<MetricStatus, string> = {
  critical: 'border-red-600',
  warning: 'border-amber-500',
  normal: 'border-green-600',
};

const DESC_BG_MAP: Record<MetricStatus, string> = {
  critical: 'bg-red-50 text-red-700',
  warning: 'bg-amber-50 text-amber-700',
  normal: 'bg-green-50 text-green-700',
};

const CTA_VARIANT_MAP: Record<MetricStatus, 'danger' | 'warning' | 'primary'> = {
  critical: 'danger',
  warning: 'warning',
  normal: 'primary',
};

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [GaugeChartComponent, ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card bg-base-100 shadow-sm border-2 rounded-xl overflow-hidden"
      [class]="borderClass()"
    >
      <div class="card-body items-center text-center p-4 gap-2">
        <h3 class="card-title text-sm font-semibold">{{ metric().title }}</h3>

        <app-gauge-chart
          [value]="metric().value"
          [maxValue]="metric().maxValue"
          [status]="metric().status"
          [displayValue]="metric().displayValue"
          class="w-full max-w-[180px]"
        />

        <span
          class="inline-block text-xs px-3 py-1 rounded-full font-medium"
          [class]="descClass()"
        >
          {{ metric().description }}
        </span>

        @if (metric().ctaLabel) {
          <app-action-button
            [label]="metric().ctaLabel!"
            [variant]="ctaVariant()"
            class="mt-1"
          />
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class MetricCardComponent {
  readonly metric = input.required<Metric>();

  readonly borderClass = computed(() => BORDER_MAP[this.metric().status]);
  readonly descClass = computed(() => DESC_BG_MAP[this.metric().status]);
  readonly ctaVariant = computed(() => CTA_VARIANT_MAP[this.metric().status]);
}
