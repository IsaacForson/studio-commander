import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full px-6 pb-10 pt-5 text-center lg:px-10">
      <p class="w-full text-sm font-bold leading-normal text-base-content">
        Powered by Studio Commander · Gracie Jiu-Jitsu Santa Monica
      </p>
    </footer>
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
export class FooterComponent {}
