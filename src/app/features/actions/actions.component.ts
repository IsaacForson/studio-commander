import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { ActionSortDirection } from '../../core/models';
import { ActionCardComponent } from './components/action-card.component';

const toolbarBtnClass =
  'border-toolbar inline-flex h-[43px] items-center gap-2 rounded-lg border bg-transparent px-4 text-sm font-medium text-base-content transition-colors hover:bg-base-content/5';

const toolbarSelectClass =
  'border-toolbar h-[43px] w-full appearance-none rounded-lg border bg-transparent pl-4 pr-10 text-sm font-medium text-base-content outline-none';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [ActionCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="animate-fade-in-up bg-surface-elevated rounded-2xl border border-base-300/60 px-5 pb-40 pt-5 shadow-figma-drop lg:px-6 lg:pb-44 lg:pt-6"
    >
      <!-- Toolbar -->
      <div class="mb-6 flex flex-wrap items-center gap-3">
        <button type="button" [class]="toolbarBtnClass" (click)="filtersVisible.set(!filtersVisible())">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Show Filters
        </button>
        <button type="button" [class]="toolbarBtnClass" (click)="refresh()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        <div class="relative ml-auto min-w-[280px]">
          <select [class]="toolbarSelectClass" (change)="toggleSort()">
            <option value="desc">Sort by: Date - Latest to Oldest</option>
            <option value="asc">Sort by: Date - Oldest to Latest</option>
          </select>
          <svg
            class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="space-y-4">
        @for (action of sortedActions(); track action.id) {
          <app-action-card [action]="action" class="animate-fade-in-up animate-stagger" [style.--stagger-index]="$index" />
        }
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class ActionsComponent {
  private readonly mockData = inject(MockDataService);
  private readonly actions = this.mockData.getActionItems();

  readonly toolbarBtnClass = toolbarBtnClass;
  readonly toolbarSelectClass = toolbarSelectClass;
  readonly filtersVisible = signal(false);
  readonly sortDirection = signal<ActionSortDirection>('desc');

  readonly sortedActions = computed(() => {
    const dir = this.sortDirection();
    return [...this.actions].sort((a, b) => {
      const diff = a.timestamp.getTime() - b.timestamp.getTime();
      return dir === 'desc' ? -diff : diff;
    });
  });

  toggleSort(): void {
    this.sortDirection.update(d => (d === 'desc' ? 'asc' : 'desc'));
  }

  refresh(): void {
    // placeholder for refresh logic
  }
}
