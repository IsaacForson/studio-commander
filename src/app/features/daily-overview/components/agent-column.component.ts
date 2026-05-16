import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Agent } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-agent-column',
  standalone: true,
  imports: [ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let a = agent();
    <div
      class="rounded-2xl p-5"
      [class]="a.agentRole === 'operations' ? 'border-2 border-base-300 bg-base-100' : 'bg-base-100'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div
            class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gray-400"
          >
            {{ a.name[0] }}
          </div>
          <div>
            <h3 class="font-bold text-lg text-base-content">{{ a.name }}</h3>
            <p class="text-xs text-base-content/50">{{ a.role }}</p>
          </div>
        </div>
        <span
          class="text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5"
          [class]="a.badgeVariant === 'warning' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'"
        >
          @if (a.badgeVariant === 'warning') {
            <span>⚠</span>
          } @else {
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
          }
          {{ a.badgeCount }} {{ a.badgeLabel }}
        </span>
      </div>

      <!-- Sections -->
      @for (section of a.sections; track section.title) {
        <div class="mb-5">
          <!-- Section header with line separator -->
          <div class="flex items-center gap-3 mb-3">
            <h4 class="text-sm text-base-content/50 flex items-center gap-1.5 whitespace-nowrap">
              @if (section.icon) {
                <span class="text-xs">{{ section.icon }}</span>
              }
              {{ section.title }}
            </h4>
            <div class="flex-1 h-px bg-base-300"></div>
          </div>

          <div class="space-y-3">
            @for (task of section.tasks; track task.title) {
              <div class="bg-base-100 border border-base-300 rounded-xl p-4">
                <div class="flex items-start gap-2.5">
                  <!-- Task icon -->
                  @if (task.status === 'completed') {
                    <span class="text-green-500 text-lg mt-0.5">✅</span>
                  } @else if (task.statusVariant === 'error') {
                    <span class="text-red-500 text-lg mt-0.5">🔺</span>
                  } @else if (task.statusVariant === 'warning') {
                    <span class="text-amber-500 text-lg mt-0.5">⚠️</span>
                  } @else if (task.ctaAction === 'review-campaign' || task.ctaAction === 'send-photos') {
                    <span class="text-indigo-500 text-lg mt-0.5">✉️</span>
                  } @else {
                    <span class="text-base-content/30 text-lg mt-0.5">●</span>
                  }

                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h5 class="text-sm font-bold text-base-content leading-snug">{{ task.title }}</h5>
                    </div>
                    <p class="text-xs text-base-content/50 mt-1 leading-relaxed">{{ task.description }}</p>

                    <!-- Status badges row -->
                    <div class="flex flex-wrap items-center gap-2 mt-2">
                      @if (task.statusLabel) {
                        <span
                          class="text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1"
                          [class]="task.statusVariant === 'success' ? 'bg-green-100 text-green-700' : task.statusVariant === 'error' ? 'bg-red-100 text-red-700' : task.statusVariant === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-base-200 text-base-content/60'"
                        >
                          {{ task.statusLabel }}
                        </span>
                      }
                      @if (task.ctaLabel && !task.hasAiIcon) {
                        <app-action-button
                          [label]="task.ctaLabel"
                          variant="ghost"
                        />
                      }
                    </div>

                    @if (task.ctaLabel && task.hasAiIcon) {
                      <div class="mt-3">
                        <app-action-button
                          [label]="task.ctaLabel"
                          variant="primary"
                          [hasAiIcon]="true"
                        />
                      </div>
                    }
                    @if (task.ctaLabel && !task.hasAiIcon && task.ctaAction) {
                      <div class="mt-3">
                        <app-action-button
                          [label]="task.ctaLabel"
                          variant="danger"
                        />
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class AgentColumnComponent {
  readonly agent = input.required<Agent>();
}
