import {
  Component,
  ChangeDetectionStrategy,
  input,
  viewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { TrendChartData } from '../../../core/models';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let d = data();
    <div class="rounded-xl border border-base-300/80 bg-base-100 p-5 lg:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 class="text-lg font-bold text-base-content">{{ d.title }}</h3>

        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <select
              class="border-toolbar h-[45px] appearance-none rounded-lg border bg-transparent pl-4 pr-10 text-sm font-medium text-base-content outline-none"
            >
              <option>{{ d.dateRange }}</option>
            </select>
            <svg
              class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button
            type="button"
            class="inline-flex h-[45px] items-center gap-2 rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white hover:bg-amber-600"
          >
            <span>✦</span>
            Trend Analysis
          </button>
        </div>
      </div>

      <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        @for (stat of d.stats; track stat.label) {
          <div class="rounded-lg border border-base-300/60 bg-base-200/50 px-4 py-3">
            <p class="mb-1 text-xs text-base-content/60">{{ stat.label }}</p>
            <p class="text-xl font-bold text-base-content">{{ stat.value }}</p>
            @if (stat.change) {
              <p
                class="mt-1 text-xs font-medium"
                [class.text-error]="stat.changeDirection === 'down'"
                [class.text-success]="stat.changeDirection === 'up'"
              >
                @if (stat.changeDirection === 'down') {
                  <span>▼</span>
                } @else if (stat.changeDirection === 'up') {
                  <span>▲</span>
                }
                {{ stat.change }}
              </p>
            }
          </div>
        }
      </div>

      <div class="relative h-64">
        <canvas #chartCanvas></canvas>
      </div>
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
export class TrendChartComponent implements AfterViewInit, OnDestroy {
  readonly data = input.required<TrendChartData>();
  readonly chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;
  private viewReady = false;

  constructor() {
    effect(() => {
      const d = this.data();
      if (this.viewReady) {
        this.renderChart(d);
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart(this.data());
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(d: TrendChartData): void {
    const canvas = this.chartCanvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart?.destroy();

    const gridColor =
      document.documentElement.getAttribute('data-theme') === 'studio-dark'
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.06)';
    const tickColor =
      document.documentElement.getAttribute('data-theme') === 'studio-dark'
        ? 'rgba(255,255,255,0.5)'
        : 'rgba(0,0,0,0.45)';

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.dataPoints.map(p => p.label),
        datasets: [
          {
            label: d.title,
            data: d.dataPoints.map(p => p.value),
            borderColor: '#ef4444',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#ef4444',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              callback: v => {
                const n = Number(v);
                if (Math.abs(n) >= 1000) return `$${n / 1000}k`;
                return `$${n}`;
              },
            },
          },
          x: {
            grid: { display: false },
            ticks: { color: tickColor },
          },
        },
      },
    });
  }
}
