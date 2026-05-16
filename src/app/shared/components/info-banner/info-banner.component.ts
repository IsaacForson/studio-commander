import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full px-6 pt-8 lg:px-10">
      <div
        class="flex w-full items-start justify-center gap-3 rounded-xl border border-[#CDCDCD] bg-[#EEEEEE] px-6 py-5 lg:px-10"
      >
        <svg
          class="mt-0.5 h-5 w-5 shrink-0 text-[#666666]"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="flex-1 text-center text-sm leading-relaxed text-[#4D4D4D]">
          {{ message() }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class InfoBannerComponent {
  readonly message = input('');
}
