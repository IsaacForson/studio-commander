import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-base-200 border-t border-base-300 px-6 py-3 flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-info shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm text-base-content/70">{{ message() }}</p>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class InfoBannerComponent {
  readonly message = input('');
}
