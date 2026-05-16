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
      <h3
        class="flex min-h-[42px] shrink-0 items-center justify-center px-1 text-center text-sm font-semibold leading-snug text-base-content line-clamp-2"
      >
        {{ metric().title }}
      </h3>

      <div class="flex h-[180px] shrink-0 items-end justify-center">
        <app-gauge-chart
          [value]="metric().value"
          [maxValue]="metric().maxValue"
          [status]="metric().status"
          [displayValue]="metric().displayValue"
          class="h-[172px] w-full max-w-[220px]"
        />
      </div>

      <div class="mt-auto flex w-full flex-col items-center gap-2 pt-2">
        <span class="inline-block rounded-full px-3 py-1 text-center text-xs font-medium" [class]="pillClass()">
          {{ metric().description }}
        </span>

        @if (metric().ctaLabel) {
          <app-action-button [label]="metric().ctaLabel!" [variant]="ctaVariant()" />
        } @else {
          <div class="h-10" aria-hidden="true"></div>
        }
      </div>
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        min-height: 360px;
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
      'flex h-full w-full flex-col rounded-xl border-2 p-4 text-left shadow-figma-drop transition-shadow hover:shadow-md',
      BORDER_MAP[m.status],
      'bg-surface-card',
    ];
    if (this.selected()) {
      classes.push('ring-2 ring-primary/40 ring-offset-2 ring-offset-base-200');
    }
    return classes.join(' ');
  });

  readonly pillClass = computed(() => PILL_MAP[this.metric().status]);
  readonly ctaVariant = computed(() => CTA_VARIANT_MAP[this.metric().status]);
}
