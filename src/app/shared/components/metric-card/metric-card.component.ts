import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { Metric, MetricStatus } from '../../../core/models';
import { GaugeChartComponent } from '../gauge-chart/gauge-chart.component';
import { ActionButtonComponent } from '../action-button/action-button.component';

const BORDER_MAP: Record<MetricStatus, string> = {
  critical: 'border-[#dc2626]',
  warning: 'border-[#f59e0b]',
  normal: 'border-[#16a34a]',
};

const PILL_MAP: Record<MetricStatus, string> = {
  critical: 'metric-pill-critical',
  warning: 'metric-pill-warning',
  normal: 'metric-pill-normal',
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
    <button type="button" [class]="cardClasses()" (click)="select.emit(metric().id)">
      <h3 class="mb-2 text-center text-sm font-semibold text-base-content">{{ metric().title }}</h3>

      <div class="flex flex-1 items-center justify-center">
        <app-gauge-chart
          [value]="metric().value"
          [maxValue]="metric().maxValue"
          [status]="metric().status"
          [displayValue]="metric().displayValue"
          class="w-full max-w-[160px]"
        />
      </div>

      <span class="mx-auto mt-2 inline-block rounded-full px-3 py-1 text-center text-xs font-medium" [class]="pillClass()">
        {{ metric().description }}
      </span>

      @if (metric().ctaLabel) {
        <div class="mt-3 flex justify-center">
          <app-action-button [label]="metric().ctaLabel!" [variant]="ctaVariant()" />
        </div>
      } @else {
        <div class="mt-3 h-10"></div>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class MetricCardComponent {
  readonly metric = input.required<Metric>();
  readonly selected = input(false);
  readonly select = output<string>();

  readonly cardClasses = computed(() => {
    const m = this.metric();
    const classes = [
      'flex h-full min-h-[280px] w-full flex-col rounded-xl border-2 p-4 text-left shadow-figma-drop transition-shadow hover:shadow-md',
      BORDER_MAP[m.status],
      m.status === 'critical' ? 'bg-metric-critical' : 'bg-surface-card',
    ];
    if (this.selected()) {
      classes.push('ring-2 ring-primary/40 ring-offset-2 ring-offset-base-200');
    }
    return classes.join(' ');
  });

  readonly pillClass = computed(() => PILL_MAP[this.metric().status]);
  readonly ctaVariant = computed(() => CTA_VARIANT_MAP[this.metric().status]);
}
