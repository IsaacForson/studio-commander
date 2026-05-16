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
      <div>
        <div class="flex items-center gap-3 mb-3">
          <p class="text-xs text-base-content/40 tracking-wide whitespace-nowrap">Daily Summary</p>
          <div class="flex-1 h-px bg-base-300"></div>
        </div>
        <app-daily-summary [summary]="summary" />
      </div>

      <!-- Daily Operations Section -->
      <div>
        <div class="flex items-center gap-3 mb-3">
          <p class="text-xs text-base-content/40 tracking-wide whitespace-nowrap">Daily Operations</p>
          <div class="flex-1 h-px bg-base-300"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          @for (agent of agents; track agent.name) {
            <app-agent-column [agent]="agent" />
          }
        </div>
      </div>

      <!-- Intelligence Panels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-kpi-intelligence [data]="kpiData" />
        <app-marketing-intelligence [data]="marketingData" />
      </div>

      <!-- Tomorrow Morning -->
      <div class="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div class="flex items-center gap-3 mb-3">
          <h3 class="text-sm font-semibold text-amber-500 flex items-center gap-2 whitespace-nowrap">
            <span>✦</span> Tomorrow morning
          </h3>
          <div class="flex-1 h-px bg-amber-300/30"></div>
        </div>
        <p class="text-sm text-base-content/80 leading-relaxed">
          Symon will have the full re-engagement response data ready — who responded, who may benefit
          from a personal call, and an updated view of your billing opportunity. Sera will have Day 3 ready when
          you approve it.
        </p>
      </div>

      <!-- Want Symon to do something -->
      <div class="bg-amber-500 text-white rounded-2xl px-5 py-3.5 flex items-center gap-3">
        <span>✦</span>
        <span class="text-sm font-medium">Want Symon to do something else?</span>
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
