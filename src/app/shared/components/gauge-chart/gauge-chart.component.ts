import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MetricStatus } from '../../../core/models';
import { STATUS_COLORS } from '../../../core/constants/theme.constants';

/** Three solid outer slices (red / yellow / green) with small gaps between. */
const OUTER_SEGMENTS = [
  { start: 152, end: 226, color: '#ef4444' },
  { start: 234, end: 306, color: '#eab308' },
  { start: 314, end: 388, color: '#22c55e' },
] as const;

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 200 130" class="w-full" aria-hidden="true">
      <!-- Outer scale: 3 solid slices (not dashed) -->
      @for (seg of outerSegments; track seg.start) {
        <path
          [attr.d]="arcPath(outerRadius, seg.start, seg.end)"
          fill="none"
          [attr.stroke]="seg.color"
          stroke-width="5"
          stroke-linecap="round"
        />
      }

      <!-- Inner track (thicker, gray) -->
      <path
        [attr.d]="arcPath(innerRadius, startAngle, endAngle)"
        fill="none"
        stroke="#d1d5db"
        stroke-width="16"
        stroke-linecap="round"
      />

      <!-- Inner progress -->
      <path
        [attr.d]="progressArc()"
        fill="none"
        [attr.stroke]="arcColor()"
        stroke-width="16"
        stroke-linecap="round"
      />

      <text
        x="100"
        y="98"
        text-anchor="middle"
        [attr.fill]="arcColor()"
        style="font-size: 26px; font-weight: 700"
      >
        {{ displayValue() }}
      </text>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class GaugeChartComponent {
  readonly value = input.required<number>();
  readonly maxValue = input.required<number>();
  readonly status = input.required<MetricStatus>();
  readonly displayValue = input.required<string>();

  readonly outerSegments = OUTER_SEGMENTS;
  readonly startAngle = 150;
  readonly endAngle = 390;
  readonly innerRadius = 68;
  readonly outerRadius = 82;
  readonly centerX = 100;
  readonly centerY = 88;

  readonly arcColor = computed(() => STATUS_COLORS[this.status()].fill);

  readonly progressArc = computed(() => {
    const ratio = Math.min(Math.max(Math.abs(this.value()) / this.maxValue(), 0), 1);
    const progressEnd = this.startAngle + ratio * (this.endAngle - this.startAngle);
    return this.describeArc(this.centerX, this.centerY, this.innerRadius, this.startAngle, progressEnd);
  });

  arcPath(radius: number, start: number, end: number): string {
    return this.describeArc(this.centerX, this.centerY, radius, start, end);
  }

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
