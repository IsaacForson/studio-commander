import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DailySummary } from '../../../core/models';

@Component({
  selector: 'app-daily-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = summary();
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Win Box - Dark green -->
      <div class="bg-green-900 text-white rounded-2xl p-6 flex items-center gap-4">
        <span class="text-4xl shrink-0">🏆</span>
        <div class="flex-1 min-w-0">
          <h4 class="text-green-300 font-semibold text-sm mb-1">{{ s.winTitle }}</h4>
          <p class="text-sm text-white/80 leading-relaxed">{{ s.winDescription }}</p>
          <p class="text-xs text-green-400 mt-2 flex items-center gap-1">
            <span>▲</span> $290 over last month
          </p>
        </div>
        <span class="text-4xl font-bold text-white shrink-0">{{ s.winAmount }}</span>
      </div>

      <!-- Health Score + Network Top Studios combined -->
      <div class="flex gap-0 rounded-2xl overflow-hidden">
        <!-- Health Score - Blue/navy gradient -->
        <div class="bg-gradient-to-br from-indigo-900 to-blue-900 text-white flex-1 p-6 flex items-center gap-5">
          <div class="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="white"
                stroke-opacity="0.15"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f59e0b"
                stroke-width="3"
                [attr.stroke-dasharray]="s.healthScore + ', 100'"
                stroke-linecap="round"
              />
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
              {{ s.healthScore }}
            </span>
          </div>
          <div>
            <h4 class="font-bold text-base mb-2">Studio Health Score</h4>
            <p class="text-xs flex items-center gap-1.5 mb-1">
              <span>🔥</span> {{ s.healthStreak }}
            </p>
            <p class="text-xs flex items-center gap-1.5 text-green-400">
              <span class="w-3 h-3 rounded bg-green-500 flex items-center justify-center text-white text-[8px]">▲</span>
              {{ s.healthChange }}
            </p>
          </div>
        </div>

        <!-- Network Top Studios - Dark purple -->
        <div class="bg-purple-950 text-white px-6 py-5 flex flex-col items-center justify-center min-w-[160px]">
          <p class="text-[10px] uppercase tracking-wider opacity-60 mb-1">Network Top Studios</p>
          <span class="text-5xl font-bold leading-none">{{ s.retentionScore }}</span>
          <p class="text-xs text-yellow-400 mt-2">Your gap: 14 pts</p>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class DailySummaryComponent {
  readonly summary = input.required<DailySummary>();
}
