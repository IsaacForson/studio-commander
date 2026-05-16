import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="py-4 text-center">
      <p class="text-xs text-base-content/50">
        Powered by Studio Commander · Gracie Jiu-Jitsu Santa Monica
      </p>
    </footer>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class FooterComponent {}
