import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DailySummary } from '../../../core/models';

@Component({
  selector: 'app-daily-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = summary();
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Win - Overnight -->
      <div
        class="rounded-2xl p-5 flex items-center gap-4 text-white border-2 border-[#18631D]"
        style="background: linear-gradient(90deg, #1A291B 0%, #18631D 100%)"
      >
        <!-- Trophy -->
        <div class="shrink-0 w-14 h-14 flex items-center justify-center">
          <svg viewBox="0 0 48 48" class="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 6h16v4c0 4.5 2.8 8.4 7 9.8V22H25v14h-2v-14h-6v-2.2c4.2-1.4 7-5.3 7-9.8V6z"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path d="M12 22h24v2H12v-2z" stroke="white" stroke-width="2" />
            <path d="M14 28h6v4h-2v-2h-2v-2zM28 28h6v4h-2v-2h-2v-2z" stroke="white" stroke-width="2" />
            <circle cx="24" cy="14" r="3" stroke="white" stroke-width="1.5" fill="none" />
          </svg>
        </div>

        <!-- Title + description -->
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold leading-tight mb-2" style="color: #AAFF85; font-size: 24px">
            {{ s.winTitle }}
          </h4>
          <p class="leading-snug text-white/90" style="font-size: 16px">
            {{ s.winDescription }}
          </p>
        </div>

        <!-- Amount + trend (stacked) -->
        <div class="shrink-0 flex flex-col items-end">
          <span class="text-4xl font-bold leading-none" style="color: #AAFF85">{{ s.winAmount }}</span>
          <div
            class="mt-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-white"
            style="background: #2d6a32"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                clip-rule="evenodd"
              />
            </svg>
            $290 over last month
          </div>
        </div>
      </div>

      <!-- Studio Health Score + Network Top Studios -->
      <div
        class="rounded-2xl overflow-hidden flex border-2 border-indigo-900"
        style="background: linear-gradient(90deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)"
      >
        <div class="flex-1 p-5 flex items-center gap-4 text-white">
          <!-- Gauge -->
          <div class="relative w-[72px] h-[72px] shrink-0">
            <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#fbbf24"
                stroke-width="3"
                [attr.stroke-dasharray]="s.healthScore + ', 100'"
                stroke-linecap="round"
              />
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-400">
              {{ s.healthScore }}
            </span>
          </div>

          <div class="min-w-0">
            <h4 class="font-semibold leading-tight mb-2 text-amber-400" style="font-size: 24px">
              Studio Health Score
            </h4>
            <p class="flex items-center gap-2 mb-1.5 text-white/90 leading-snug" style="font-size: 16px">
              <span>🔥</span>
              {{ s.healthStreak }}
            </p>
            <p class="flex items-center gap-2 text-green-400 leading-snug" style="font-size: 16px">
              <span
                class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-green-500 text-[10px] text-white"
              >▲</span>
              {{ s.healthChange }}
            </p>
          </div>
        </div>

        <!-- Network Top Studios inset -->
        <div
          class="my-3 mr-3 ml-0 shrink-0 self-center flex flex-col items-center justify-center rounded-xl border border-white/30 px-4 py-3 text-center text-white"
          style="background: rgba(0, 0, 0, 0.2)"
        >
          <p class="text-purple-200/80 leading-tight" style="font-size: 14px">Network Top Studios</p>
          <span class="font-bold leading-none my-0.5" style="font-size: 48px">{{ s.retentionScore }}</span>
          <p class="font-medium text-pink-400 leading-tight" style="font-size: 14px">Your gap: 14 pts</p>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class DailySummaryComponent {
  readonly summary = input.required<DailySummary>();
}
