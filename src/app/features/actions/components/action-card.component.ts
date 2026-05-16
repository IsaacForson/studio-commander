import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActionItem } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [DatePipe, ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let a = action();
    <div
      class="card bg-base-100 shadow-sm border border-base-300 p-4"
      [class.border-l-4]="a.priority === 'critical'"
      [class.border-l-error]="a.priority === 'critical'"
    >
      <div class="flex gap-4">
        <!-- Agent avatar -->
        <div
          class="flex-none w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          [class.bg-blue-600]="a.agentName === 'Symon'"
          [class.bg-purple-600]="a.agentName === 'Sera'"
        >
          {{ a.agentName[0] }}
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="font-bold text-sm">{{ a.title }}</h3>
              <p class="text-sm text-base-content/60 mt-1">{{ a.description }}</p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-none">
              @if (a.priority === 'critical') {
                <span class="badge badge-error badge-sm text-white">Critical</span>
              }
              <span class="text-xs text-base-content/50 whitespace-nowrap">
                {{ a.timestamp | date:'hh:mm a MMMM dd, yyyy' }}
              </span>
            </div>
          </div>
          <div class="mt-3">
            <app-action-button
              [label]="a.ctaLabel"
              [variant]="a.ctaVariant"
              [hasAiIcon]="a.hasAiIcon ?? false"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class ActionCardComponent {
  readonly action = input.required<ActionItem>();
}
