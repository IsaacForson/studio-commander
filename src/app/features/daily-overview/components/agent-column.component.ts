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
      class="rounded-2xl p-5 bg-base-100 border-2"
      [class]="a.agentRole === 'operations' ? 'border-amber-400 border-l-4 border-l-amber-500' : 'border-teal-300 border-l-4 border-l-teal-500'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <span class="text-gray-500 text-lg">👤</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-base-content">{{ a.name }}</h3>
            <p class="text-xs text-base-content/50">{{ a.role }}</p>
          </div>
        </div>
        <span
          class="text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border"
          [class]="a.badgeVariant === 'warning' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'"
        >
          @if (a.badgeVariant === 'warning') {
            <span>⚠️</span>
          } @else {
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
          }
          {{ a.badgeCount }} {{ a.badgeLabel }}
        </span>
      </div>

      <!-- Sections -->
      @for (section of a.sections; track section.title) {
        <div class="mb-5">
          <div class="flex items-center gap-3 mb-3">
            <h4 class="text-sm text-base-content/50 flex items-center gap-1.5 whitespace-nowrap">
              <span class="text-xs">⚙️</span>
              {{ section.title }}
            </h4>
            <div class="flex-1 h-px bg-base-300"></div>
          </div>

          <div class="space-y-3">
            @for (task of section.tasks; track task.title) {
              <div
                class="bg-base-100 border border-base-300 rounded-xl p-4 border-l-4"
                [class]="task.statusVariant === 'error' ? 'border-l-red-500' : task.statusVariant === 'warning' ? 'border-l-amber-500' : task.status === 'completed' ? 'border-l-base-300' : task.hasAiIcon ? 'border-l-base-300' : 'border-l-base-300'"
              >
                <div class="flex items-start gap-2.5">
                  @if (task.status === 'completed') {
                    <span class="text-lg mt-0.5 shrink-0">✅</span>
                  } @else if (task.statusVariant === 'error') {
                    <span class="text-lg mt-0.5 shrink-0">🔺</span>
                  } @else if (task.statusVariant === 'warning') {
                    <span class="text-lg mt-0.5 shrink-0">⚠️</span>
                  } @else if (task.hasAiIcon) {
                    <span class="text-lg mt-0.5 shrink-0">✉️</span>
                  } @else {
                    <span class="text-base-content/30 text-lg mt-0.5 shrink-0">●</span>
                  }

                  <div class="flex-1 min-w-0">
                    <h5 class="text-sm font-bold text-base-content leading-snug mb-1">{{ task.title }}</h5>
                    <p class="text-xs text-base-content/60 leading-relaxed">{{ task.description }}</p>

                    <div class="flex flex-wrap items-center gap-2 mt-2.5">
                      @if (task.statusLabel && task.statusVariant === 'success') {
                        <span class="text-xs px-2.5 py-1 rounded-md font-medium bg-green-500 text-white flex items-center gap-1">
                          {{ task.statusLabel.split('·')[0] }}
                          @if (task.statusLabel.includes('·')) {
                            <span>📅</span> {{ task.statusLabel.split('·')[1] }}
                          }
                        </span>
                      }
                      @if (task.statusLabel && task.statusVariant === 'error') {
                        <span class="text-xs px-2.5 py-1 rounded-md font-medium bg-teal-500 text-white">
                          {{ task.statusLabel.split('·')[0] }}
                        </span>
                        @if (task.statusLabel.includes('·')) {
                          <span class="text-xs text-base-content/50 flex items-center gap-1">📅 {{ task.statusLabel.split('·')[1] }}</span>
                        }
                      }
                      @if (task.statusLabel && !task.statusVariant) {
                        <span class="text-xs px-2.5 py-1 rounded-full font-medium border border-base-300 text-base-content/60 flex items-center gap-1">
                          👁 {{ task.statusLabel }}
                        </span>
                      }
                      @if (task.ctaLabel && !task.hasAiIcon && !task.ctaAction) {
                        <span class="text-xs px-2.5 py-1 rounded-full font-medium border border-base-300 text-base-content/60">{{ task.ctaLabel }}</span>
                      }
                    </div>

                    @if (task.ctaAction === 'review-recovery') {
                      <div class="mt-3">
                        <app-action-button [label]="task.ctaLabel!" variant="danger" />
                      </div>
                    }
                    @if (task.hasAiIcon && task.ctaLabel) {
                      <div class="mt-3">
                        <app-action-button [label]="task.ctaLabel" variant="primary" [hasAiIcon]="true" />
                      </div>
                    }
                    @if (task.ctaAction === 'send-photos') {
                      <div class="mt-3">
                        <app-action-button [label]="task.ctaLabel!" variant="primary" />
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
