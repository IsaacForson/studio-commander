import {
  Component,
  ChangeDetectionStrategy,
  input,
  viewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
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
    <div class="card bg-base-100 shadow-sm border border-base-300 p-5">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 class="text-lg font-bold">{{ d.title }}</h3>
        <select class="select select-bordered select-sm">
          <option>{{ d.dateRange }}</option>
        </select>
        <button class="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-0">
          Trend Analysis ✦
        </button>
      </div>

      <!-- Stat boxes -->
      <div class="grid grid-cols-3 gap-4 mb-5">
        @for (stat of d.stats; track stat.label) {
          <div class="bg-base-200 rounded-lg p-3">
            <p class="text-xs text-base-content/60 mb-1">{{ stat.label }}</p>
            <p class="text-lg font-bold">{{ stat.value }}</p>
            @if (stat.change) {
              <span
                class="text-xs font-medium"
                [class.text-error]="stat.changeDirection === 'down'"
                [class.text-success]="stat.changeDirection === 'up'"
              >
                {{ stat.changeDirection === 'down' ? '▼' : '▲' }} {{ stat.change }}
              </span>
            }
          </div>
        }
      </div>

      <!-- Chart -->
      <div class="relative h-64">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class TrendChartComponent implements AfterViewInit, OnDestroy {
  readonly data = input.required<TrendChartData>();
  readonly chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    const d = this.data();
    const ctx = this.chartCanvas().nativeElement.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0.02)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.dataPoints.map(p => p.label),
        datasets: [
          {
            label: d.title,
            data: d.dataPoints.map(p => p.value),
            borderColor: '#ef4444',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#ef4444',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: 'rgba(150,150,150,0.1)' },
            ticks: { callback: v => `$${Number(v) / 1000}k` },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
