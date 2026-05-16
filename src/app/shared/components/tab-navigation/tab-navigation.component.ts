import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="bg-surface-elevated flex w-full items-center rounded-2xl border border-base-300/60 p-1.5 shadow-figma-soft"
    >
      <div class="flex items-center gap-[10px]">
      <a
        routerLink="/daily-overview"
        routerLinkActive="!bg-navy !text-white"
        class="flex items-center gap-2 rounded-[12px] bg-base-200 px-5 py-2.5 text-sm font-medium text-base-content transition-colors hover:bg-base-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Daily Overview
      </a>

      <a
        routerLink="/key-metrics"
        routerLinkActive="!bg-navy !text-white"
        class="flex items-center gap-2 rounded-[12px] bg-base-200 px-5 py-2.5 text-sm font-medium text-base-content transition-colors hover:bg-base-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Key Metrics
      </a>

      <a
        routerLink="/actions"
        routerLinkActive="!bg-navy !text-white"
        class="flex items-center gap-2 rounded-[12px] bg-base-200 px-5 py-2.5 text-sm font-medium text-base-content transition-colors hover:bg-base-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Actions
        <span
          class="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-white"
        >
          {{ actionCount() }}
        </span>
      </a>
      </div>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TabNavigationComponent {
  readonly actionCount = input(3);
}
