import { Component, ChangeDetectionStrategy, input } from '@angular/core';
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
  @let isCritical = a.priority === 'critical';
    <div
      class="rounded-xl border p-4 shadow-figma-drop"
      [class.border-[#A40000]]="isCritical"
      [class.bg-[#FFFDFD]]="isCritical"
      [class.border-[#CDCDCD]]="!isCritical"
      [class.bg-base-100]="!isCritical"
    >
      <div class="flex gap-4">
        <!-- Agent avatar -->
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          [class.bg-blue-600]="a.agentName === 'Symon'"
          [class.bg-purple-600]="a.agentName === 'Sera'"
        >
          {{ a.agentName[0] }}
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <h3 class="text-sm font-bold">{{ a.title }}</h3>
              <p class="mt-1 text-sm text-base-content/60">{{ a.description }}</p>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              @if (isCritical) {
                <span
                  class="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs font-semibold text-[#A40000]"
                >
                  Critical
                </span>
              }
              <span class="whitespace-nowrap text-xs text-base-content/50">
                {{ a.timestamp | date: 'hh:mm a MMMM dd, yyyy' }}
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
