import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MetricStatus } from '../../../core/models';

const BADGE_CLASSES: Record<MetricStatus, string> = {
  critical: 'bg-red-100 text-red-700',
  warning: 'bg-amber-100 text-amber-700',
  normal: 'bg-green-100 text-green-700',
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      [class]="badgeClass()"
    >
      {{ label() }}
    </span>
  `,
  styles: [`
    :host { display: inline-block; }
  `],
})
export class StatusBadgeComponent {
  readonly status = input.required<MetricStatus>();
  readonly label = input.required<string>();

  readonly badgeClass = computed(() => BADGE_CLASSES[this.status()]);
}
