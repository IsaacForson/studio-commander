import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MetricStatus } from '../../../core/models';
import { STATUS_COLORS } from '../../../core/constants/theme.constants';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 200 140'" class="w-full">
      <!-- Background arc -->
      <path
        [attr.d]="bgArc()"
        fill="none"
        class="stroke-base-300"
        stroke-width="18"
        stroke-linecap="round"
      />
      <!-- Foreground arc -->
      <path
        [attr.d]="fgArc()"
        fill="none"
        [attr.stroke]="arcColor()"
        stroke-width="18"
        stroke-linecap="round"
      />
      <!-- Display value -->
      <text
        x="100"
        y="110"
        text-anchor="middle"
        class="fill-base-content text-2xl font-bold"
        style="font-size: 28px; font-weight: 700;"
      >
        {{ displayValue() }}
      </text>
    </svg>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class GaugeChartComponent {
  readonly value = input.required<number>();
  readonly maxValue = input.required<number>();
  readonly status = input.required<MetricStatus>();
  readonly displayValue = input.required<string>();

  readonly arcColor = computed(() => STATUS_COLORS[this.status()].fill);

  readonly bgArc = computed(() => this.describeArc(100, 90, 72, 150, 390));

  readonly fgArc = computed(() => {
    const ratio = Math.min(Math.max(Math.abs(this.value()) / this.maxValue(), 0), 1);
    const endAngle = 150 + ratio * 240;
    return this.describeArc(100, 90, 72, 150, endAngle);
  });

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  private describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, r, endAngle);
    const end = this.polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  }
}
