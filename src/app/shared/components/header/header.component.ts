import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MockDataService } from '../../../core/services/mock-data.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sticky top-0 z-50 block bg-base-100',
  },
  template: `
    <header class="navbar border-b border-base-300/60 bg-base-100 px-6 py-3 shadow-figma-drop lg:px-10">
      <!-- Left: Studio info -->
      <div class="flex-none">
        <div>
          <h1 class="text-xl font-bold leading-tight text-base-content">{{ studio.name }}</h1>
          <p class="text-sm text-base-content/50">{{ studio.location }}</p>
        </div>
      </div>

      <!-- Center: AI search bar -->
      <div class="flex flex-1 justify-center px-6">
        <div class="relative w-full max-w-xl">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-primary">✦</span>
          <input
            type="text"
            placeholder="Ask anything..."
            class="input h-11 w-full rounded-full border-base-300 bg-base-200 pl-10 pr-11 text-sm text-base-content shadow-none placeholder:text-base-content/40"
          />
          <button
            type="button"
            class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Right: Icons & avatar -->
      <div class="flex flex-none items-center gap-2">
        <button type="button" class="btn btn-ghost btn-sm btn-circle text-base-content/70">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <button type="button" class="btn btn-ghost btn-sm btn-circle text-base-content/70">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button
          type="button"
          class="btn btn-ghost btn-sm btn-circle text-base-content/70"
          (click)="themeService.toggle()"
          [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          @if (themeService.isDark()) {
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          }
        </button>

        <div class="avatar ml-1">
          <div class="h-9 w-9 overflow-hidden rounded-full ring-2 ring-base-300">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
              alt="Profile"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private readonly mockData = inject(MockDataService);
  readonly themeService = inject(ThemeService);
  readonly studio = this.mockData.getStudioConfig();
}
