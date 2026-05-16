import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { KpiIntelligence } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-kpi-intelligence',
  standalone: true,
  imports: [ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let d = data();
    <div class="rounded-2xl overflow-hidden border border-base-300">
      <!-- Amber header bar -->
      <div class="bg-amber-500 text-white px-5 py-3 flex items-center gap-2">
        <span>✦</span>
        <h3 class="text-sm font-bold">KPI Operations Intelligence</h3>
      </div>

      <!-- White body -->
      <div class="bg-base-100 p-5">
        <!-- Agent + Status -->
        <div class="flex items-center gap-2 mb-3">
          <div class="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">S</div>
          <span class="text-sm font-bold text-base-content">{{ d.agentName }}</span>
          <span class="text-xs text-base-content/40">14 metrics monitored ·</span>
          <span class="text-xs text-red-600 font-medium">4 critical</span>
          <span class="text-xs text-base-content/40">·</span>
          <span class="text-xs text-amber-600 font-medium">3 warning</span>
        </div>

        <!-- Summary with warning bg -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex gap-3">
          <span class="text-amber-500 text-xl shrink-0">⚠️</span>
          <p class="text-sm text-base-content leading-relaxed">{{ d.summary }}</p>
        </div>

        <!-- KPIs That Triggered This Alert -->
        <h4 class="text-xs font-semibold text-base-content/50 mb-3">KPIs That Triggered This Alert</h4>
        <div class="border border-base-300 rounded-xl overflow-hidden mb-5">
          @for (kpi of d.kpis; track kpi.label) {
            <div class="flex items-center justify-between px-4 py-3 border-b border-base-300 last:border-b-0">
              <span class="text-sm font-medium text-base-content">{{ kpi.label }}</span>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-base-content">{{ kpi.value }}</span>
                @if (kpi.target) {
                  <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">{{ kpi.target }}</span>
                }
                @if (kpi.change) {
                  <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">{{ kpi.change }}</span>
                }
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          }
        </div>

        <!-- Expired Packages Section -->
        <h4 class="text-sm font-bold text-base-content mb-0.5">34 Expired Packages — Recoverable Billing</h4>
        <div class="bg-base-200/50 rounded-xl p-4 my-4">
          <p class="text-sm text-base-content/80 leading-relaxed">
            <span class="text-green-600 font-semibold">Symon</span> identified 34 member accounts with expired packages this morning. These are members who were active but have not renewed. They already know your studio — re-enrollment is significantly easier than new acquisition. <span class="text-teal-600 font-semibold">Sera</span> has a 3-step personal outreach sequence ready to launch with your approval.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-3 mb-5">
          <div>
            <p class="text-xs text-base-content/50 mb-1">Expired</p>
            <p class="text-xl font-bold text-base-content">34</p>
          </div>
          <div>
            <p class="text-xs text-base-content/50 mb-1">Opportunity</p>
            <p class="text-xl font-bold text-base-content">$5.1k</p>
          </div>
          <div>
            <p class="text-xs text-base-content/50 mb-1">Avg Recovery</p>
            <p class="text-xl font-bold text-base-content">35%</p>
          </div>
          <div>
            <p class="text-xs text-base-content/50 mb-1">Campaign Duration</p>
            <p class="text-xl font-bold text-base-content">3 Days</p>
          </div>
        </div>

        <!-- CTA -->
        <app-action-button
          label="Launch Recovery Campaign"
          variant="primary"
          [hasAiIcon]="true"
        />

        <!-- Bottom KPI Rows -->
        <div class="mt-5 border-t border-base-300 pt-4 space-y-0">
          <div class="flex items-center justify-between py-2.5 border-b border-base-300">
            <span class="text-sm font-medium text-base-content">Profit / Loss</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">-$1.2k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Gap $3.2k</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-between py-2.5 border-b border-base-300">
            <span class="text-sm font-medium text-base-content">Member Attendance</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">$14.8k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Gap $3.2k</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-between py-2.5">
            <span class="text-sm font-medium text-base-content">Total Revenue</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">$14.8k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Gap $3.2k</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class KpiIntelligenceComponent {
  readonly data = input.required<KpiIntelligence>();
}
