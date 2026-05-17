import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { DailySummaryComponent } from './components/daily-summary.component';
import { AgentColumnComponent } from './components/agent-column.component';
import { KpiIntelligenceComponent } from './components/kpi-intelligence.component';
import { MarketingIntelligenceComponent } from './components/marketing-intelligence.component';

@Component({
  selector: 'app-daily-overview',
  standalone: true,
  imports: [
    DailySummaryComponent,
    AgentColumnComponent,
    KpiIntelligenceComponent,
    MarketingIntelligenceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <!-- Daily Summary Section -->
      <div class="animate-fade-in-up" style="--stagger-index: 0">
        <div class="flex items-center gap-3 mb-3">
          <p class="text-xs text-base-content/40 tracking-wide whitespace-nowrap">Daily Summary</p>
          <div class="flex-1 h-px bg-base-300"></div>
        </div>
        <app-daily-summary [summary]="summary" />
      </div>

      <!-- Daily Operations Section -->
      <div class="animate-fade-in-up" style="--stagger-index: 1">
        <div class="flex items-center gap-3 mb-3">
          <p class="text-xs text-base-content/40 tracking-wide whitespace-nowrap">Daily Operations</p>
          <div class="flex-1 h-px bg-base-300"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          @for (agent of agents; track agent.name) {
            <app-agent-column [agent]="agent" class="animate-fade-in-up animate-stagger" [style.--stagger-index]="$index + 2" />
          }
        </div>
      </div>

      <!-- Intelligence Panels -->
      <div class="animate-fade-in-up animate-stagger grid grid-cols-1 lg:grid-cols-2 gap-4" style="--stagger-index: 4">
        <div class="space-y-6">
          <app-kpi-intelligence [data]="kpiData" class="animate-fade-in-up animate-stagger" style="--stagger-index: 5" />

          <!-- Tomorrow morning + Want Symon (single card, no gap) -->
          <div class="animate-fade-in-up animate-stagger bg-red-50/50 border border-base-300 rounded-2xl overflow-hidden" style="--stagger-index: 6">
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-sm font-semibold text-amber-500 flex items-center gap-2 whitespace-nowrap">
                  <span>☀️</span> Tomorrow morning
                </h3>
                <div class="flex-1 h-px bg-amber-400/30"></div>
              </div>
              <p class="text-sm text-base-content/80 leading-relaxed">
                Symon will have the full re-engagement response data ready — who responded, who may benefit
                from a personal call, and an updated view of your billing opportunity. Sera will have Day 3 ready when
                you approve it.
              </p>
            </div>
            <div class="bg-amber-500 text-white px-5 py-3.5 flex items-center gap-2">
              <span>✦</span>
              <span class="text-sm font-medium">Want Symon to do something else?</span>
            </div>
          </div>
        </div>

        <app-marketing-intelligence [data]="marketingData" class="animate-fade-in-up animate-stagger" style="--stagger-index: 5" />
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class DailyOverviewComponent {
  private readonly mockData = inject(MockDataService);
  readonly summary = this.mockData.getDailySummary();
  readonly agents = this.mockData.getAgents();
  readonly kpiData = this.mockData.getKpiIntelligence();
  readonly marketingData = this.mockData.getMarketingIntelligence();
}
