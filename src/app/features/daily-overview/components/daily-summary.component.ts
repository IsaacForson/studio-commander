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
        <div class="flex shrink-0 items-center justify-center">
          <svg
            class="h-[94px] w-[92px] shrink-0"
            viewBox="0 0 92 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M35.883 20.8594L33.8283 28.1563C33.426 29.6016 33.965 31.1602 35.1799 32.0391C35.8049 32.4922 36.5471 32.7188 37.2854 32.7188C37.9807 32.7188 38.6799 32.5235 39.2776 32.1172L45.5823 27.9063L51.8792 32.1094C53.1253 32.9492 54.7776 32.9219 55.9847 32.0391C57.1995 31.1602 57.7425 29.6016 57.3363 28.1563L55.2816 20.8594L61.2269 16.168C62.4066 15.2422 62.891 13.6602 62.4222 12.2344C61.9613 10.8047 60.637 9.8125 59.1527 9.7578L51.5785 9.45311L48.9496 2.34371V2.3398C48.4301 0.9414 47.0746 0 45.5824 0C44.0902 0 42.7347 0.94141 42.2152 2.3438L39.5863 9.4571L32.0277 9.76179C30.5277 9.81648 29.2074 10.8087 28.7425 12.2384C28.2777 13.6681 28.7581 15.2462 29.93 16.1681L35.883 20.8594ZM41.8283 15.6211C43.0861 15.5625 44.3322 14.6523 44.7658 13.4727L45.5822 11.2657L46.4025 13.4923C46.8478 14.6681 48.0978 15.5743 49.3517 15.6251L51.7072 15.7188L49.8088 17.2188C48.8518 18.0079 48.3947 19.461 48.7307 20.6485L49.3675 22.9219L47.4066 21.6133C46.3558 20.9102 44.805 20.9102 43.7582 21.6133L41.7973 22.9219L42.4301 20.6641C42.7777 19.4453 42.2973 17.9649 41.3051 17.1797L39.4574 15.7149L41.8283 15.6211Z"
              fill="white"
            />
            <path
              d="M89.949 28.2304C88.7576 26.6132 86.9256 25.6874 84.9138 25.6874H78.7146L79.5505 23.0233C80.1521 21.1092 79.8122 19.078 78.6208 17.4569C77.4255 15.8358 75.5896 14.9061 73.5778 14.9061H69.3942C67.6676 14.9061 66.2692 16.3045 66.2692 18.0311C66.2692 19.7577 67.6676 21.1561 69.3942 21.1561H73.5778C70.0817 32.3321 66.5856 43.5081 63.0858 54.6831C62.7265 55.8393 61.7811 56.6636 60.617 56.8354C50.6795 58.3315 40.582 58.3315 30.652 56.8549C29.4411 56.6752 28.4332 55.8197 28.0739 54.6752C24.8551 44.3392 21.6247 34.0272 18.3864 23.7102L17.5896 21.1555H21.7693C23.4959 21.1555 24.8943 19.7571 24.8943 18.0305C24.8943 16.3039 23.4959 14.9055 21.7693 14.9055H17.5896C15.5818 14.9055 13.7458 15.8352 12.5544 17.4563C11.3786 19.054 11.031 21.136 11.6247 23.0227L12.4255 25.5852C12.4333 25.6203 12.4489 25.6555 12.4567 25.6867H6.2536C4.2458 25.6867 2.4098 26.6164 1.2184 28.2297C0.0309019 29.8469 -0.308898 31.8781 0.288712 33.7922L4.74181 48.0732C5.56212 50.6944 7.96061 52.456 10.7066 52.456H20.8396C21.2654 53.8154 21.6912 55.1669 22.113 56.5263C23.1794 59.9521 26.1716 62.5029 29.738 63.0341C32.0036 63.3701 34.2888 63.6045 36.5739 63.7959L33.9216 75.6439L30.9568 75.6478C27.0584 75.6478 23.5271 78.1048 22.1677 81.765L20.8474 85.3275C20.1365 87.2416 20.4099 89.3939 21.574 91.0697C22.7381 92.7455 24.6599 93.7494 26.7029 93.7494H64.4569C66.4999 93.7494 68.4178 92.7494 69.5897 91.0697C70.7577 89.39 71.0311 87.2416 70.3162 85.3275L68.9959 81.765C67.6404 78.1048 64.1092 75.6478 60.2068 75.6478H57.2459L54.5936 63.7998C56.9178 63.6045 59.242 63.3662 61.5545 63.0185C65.1014 62.4834 67.9803 60.0068 69.0623 56.5497L70.3396 52.4599H80.4646C83.2107 52.4599 85.6091 50.6982 86.4294 48.0732L90.8825 33.7962C91.4763 31.8782 91.1365 29.8515 89.949 28.2304ZM10.703 46.2104L6.25379 31.9374H14.4179C15.9101 36.6952 17.3945 41.453 18.8827 46.2104H10.703ZM63.137 83.9374L64.469 87.4999H26.703L28.0233 83.9374C28.4764 82.7186 29.6522 81.8983 30.953 81.8983H60.203C61.5077 81.8983 62.6839 82.7225 63.137 83.9374ZM50.84 75.6483H40.324L42.906 64.1173C43.7966 64.1407 44.6951 64.2188 45.5818 64.2188C46.4685 64.2188 47.367 64.1407 48.2576 64.1173L50.84 75.6483ZM80.461 46.2103H72.293L76.7578 31.9333L84.914 31.9293L80.461 46.2103Z"
              fill="white"
            />
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
            class="mt-2 flex items-center gap-1.5 text-sm font-medium text-white"
          >
            <svg
              class="h-[23px] w-6 shrink-0"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="24" height="23" rx="4" fill="#AAFF85" />
              <path d="M7 14L12 9L17 14L7 14Z" fill="#1A321B" />
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
          <div class="relative h-[94px] w-[94px] shrink-0">
            <svg viewBox="0 0 36 36" class="h-full w-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                stroke-width="2.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#fbbf24"
                stroke-width="2.5"
                [attr.stroke-dasharray]="s.healthScore + ', 100'"
                stroke-linecap="round"
              />
            </svg>
            <span
              class="absolute inset-0 flex items-center justify-center font-bold text-amber-400"
              style="font-size: 28px"
            >
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
              <svg
                class="h-[23px] w-6 shrink-0"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="24" height="23" rx="4" fill="#AAFF85" />
                <path d="M7 14L12 9L17 14L7 14Z" fill="#1A321B" />
              </svg>
              {{ s.healthChange }}
            </p>
          </div>
        </div>

        <!-- Network Top Studios inset -->
        <div
          class="my-3 mr-3 ml-0 shrink-0 self-center flex flex-col items-center justify-center gap-[10px] rounded-xl border border-white/30 px-4 py-3 text-center text-white"
          style="background: rgba(0, 0, 0, 0.2)"
        >
          <p class="text-purple-200/80 leading-tight" style="font-size: 14px">Network Top Studios</p>
          <span class="font-bold leading-none" style="font-size: 48px">{{ s.retentionScore }}</span>
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
