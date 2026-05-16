import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

export type ButtonVariant = 'primary' | 'warning' | 'danger' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  warning: 'bg-amber-500 hover:bg-amber-600 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-base-content/10 text-current border border-base-content/20',
};

@Component({
  selector: 'app-action-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95"
      [class]="variantClass()"
      (click)="clicked.emit()"
    >
      @if (hasAiIcon()) {
        <span class="text-xs">✦</span>
      }
      {{ label() }}
    </button>
  `,
  styles: [`
    :host { display: inline-block; }
  `],
})
export class ActionButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<ButtonVariant>('primary');
  readonly hasAiIcon = input(false);
  readonly clicked = output<void>();

  readonly variantClass = computed(() => VARIANT_CLASSES[this.variant()]);
}
