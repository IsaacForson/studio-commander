import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MetricStatus } from '../../../core/models';
import { STATUS_COLORS } from '../../../core/constants/theme.constants';

/**
 * Three outer slices along the gauge path (lower-left → over top → lower-right).
 * Angles follow the same clockwise arc as the inner track (235° → 125°).
 */
const OUTER_SEGMENTS = [
  { start: 237, end: 276, color: '#ef4444' },
  { start: 280, end: 340, color: '#eab308' },
  { start: 344, end: 123, color: '#22c55e' },
] as const;

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 200 165" class="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      @for (seg of outerSegments; track seg.start) {
        <path
          [attr.d]="arcPath(outerRadius, seg.start, seg.end)"
          fill="none"
          [attr.stroke]="seg.color"
          stroke-width="5"
          stroke-linecap="round"
        />
      }

      <path
        [attr.d]="arcPath(innerRadius, arcStart, arcEnd)"
        fill="none"
        stroke="#d1d5db"
        stroke-width="16"
        stroke-linecap="round"
      />

      <path
        [attr.d]="progressArc()"
        fill="none"
        [attr.stroke]="arcColor()"
        stroke-width="16"
        stroke-linecap="round"
      />

      <text
        x="100"
        y="108"
        text-anchor="middle"
        dominant-baseline="central"
        [attr.fill]="arcColor()"
        style="font-size: 30px; font-weight: 700"
      >
        {{ displayValue() }}
      </text>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
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
  readonly arcStart = 235;
  readonly arcEnd = 125;
  readonly innerRadius = 78;
  readonly outerRadius = 94;
  readonly centerX = 100;
  readonly centerY = 108;

  readonly arcColor = computed(() => STATUS_COLORS[this.status()].fill);

  readonly progressArc = computed(() => {
    const ratio = Math.min(Math.max(Math.abs(this.value()) / this.maxValue(), 0), 1);
    if (ratio <= 0) return '';
    const progressEnd = this.angleAtRatio(ratio);
    return this.describeArc(this.centerX, this.centerY, this.innerRadius, this.arcStart, progressEnd);
  });

  arcPath(radius: number, start: number, end: number): string {
    return this.describeArc(this.centerX, this.centerY, radius, start, end);
  }

  /** Progress clockwise along the gauge arc from arcStart to arcEnd. */
  private angleAtRatio(ratio: number): number {
    let angle = this.arcStart + ratio * this.arcSpan();
    if (angle >= 360) angle -= 360;
    return angle;
  }

  private arcSpan(): number {
    return (this.arcEnd - this.arcStart + 360) % 360;
  }

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  /**
   * Clockwise arc along the gauge (sweep=1). Sub-segments use the minor arc when span ≤ 180°.
   */
  private describeArc(
    cx: number,
    cy: number,
    r: number,
    angleStart: number,
    angleEnd: number,
  ): string {
    const start = this.polarToCartesian(cx, cy, r, angleStart);
    const end = this.polarToCartesian(cx, cy, r, angleEnd);
    let delta = (angleEnd - angleStart + 360) % 360;
    if (delta === 0) delta = 360;
    const largeArc = delta > 180 ? '1' : '0';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  }
}
