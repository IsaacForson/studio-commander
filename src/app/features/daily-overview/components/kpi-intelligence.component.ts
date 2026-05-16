import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { KpiIntelligence } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-kpi-intelligence',
  standalone: true,
  imports: [ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let d = data();
    <div class="rounded-2xl overflow-hidden border border-amber-300 border-l-4 border-l-amber-500">
      <!-- Amber header bar -->
      <div class="bg-amber-500 text-white px-5 py-3 flex items-center gap-2">
        <span>✦</span>
        <h3 class="text-sm font-bold">KPI Operations Intelligence</h3>
      </div>

      <!-- White body -->
      <div class="bg-base-100 p-5">
        <!-- Agent + Status -->
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
            <span class="text-gray-500">👤</span>
          </div>
          <div>
            <span class="text-sm font-bold text-base-content">{{ d.agentName }}</span>
            <p class="text-xs text-base-content/40">14 metrics monitored · <span class="text-red-600 font-medium">4 critical</span> · <span class="text-amber-600 font-medium">3 warning</span></p>
          </div>
        </div>

        <!-- Summary with warning bg -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex gap-3">
          <span class="text-3xl shrink-0">⚠️</span>
          <p class="text-sm text-base-content leading-relaxed">{{ d.summary }}</p>
        </div>

        <!-- KPIs That Triggered This Alert - ACCORDIONS -->
        <h4 class="text-xs font-semibold text-base-content/50 mb-3">KPIs That Triggered This Alert</h4>

        <!-- Total Revenue accordion -->
        <div class="border border-base-300 rounded-xl mb-2 overflow-hidden">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('revenue')"
          >
            <span class="text-sm font-semibold text-base-content">Total Revenue</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">$14.8k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">10% below specified target</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'revenue'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- DVA Score accordion -->
        <div class="border border-base-300 rounded-xl mb-2 overflow-hidden">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('dva')"
          >
            <span class="text-sm font-semibold text-base-content">DVA Score</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">71%</span>
              <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">-12 / +3</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'dva'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Expired Packages accordion (default open) -->
        <div class="border border-amber-300 border-l-4 border-l-amber-500 rounded-xl mb-4 overflow-hidden" [class.border-base-300]="openAccordion() !== 'expired'" [class.border-l-0]="openAccordion() !== 'expired'">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('expired')"
          >
            <span class="text-sm font-semibold text-base-content">Expired Packages</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">34</span>
              <span class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">34 lapsed</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'expired'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>

          @if (openAccordion() === 'expired') {
            <div class="px-4 pb-4 border-t border-base-300">
              <h4 class="text-sm font-bold text-base-content mt-3 mb-1">34 Expired Packages — Recoverable Billing</h4>
              <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                <span class="text-amber-600 font-semibold">Symon</span> identified 34 member accounts with expired packages this morning. These are members who were active but have not renewed. They already know your studio — re-enrollment is significantly easier than new acquisition. <span class="text-teal-600 font-semibold">Sera</span> has a 3-step personal outreach sequence ready to launch with your approval.
              </p>

              <div class="grid grid-cols-4 gap-2 mb-4">
                <div class="border border-base-300 rounded-lg p-3">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Expired</p>
                  <p class="text-xl font-bold text-base-content">34</p>
                </div>
                <div class="border border-base-300 rounded-lg p-3">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Opportunity</p>
                  <p class="text-xl font-bold text-base-content">$5.1k</p>
                </div>
                <div class="border border-base-300 rounded-lg p-3">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Avg Recovery</p>
                  <p class="text-xl font-bold text-base-content">35%</p>
                </div>
                <div class="border border-base-300 rounded-lg p-3">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Campaign Duration</p>
                  <p class="text-xl font-bold text-base-content">3 Days</p>
                </div>
              </div>

              <app-action-button
                label="Launch Recovery Campaign"
                variant="primary"
                [hasAiIcon]="true"
              />
            </div>
          }
        </div>

        <!-- Bottom KPI Rows -->
        <div class="space-y-2">
          <div class="flex items-center justify-between px-4 py-2.5 border border-base-300 rounded-xl">
            <span class="text-sm font-medium text-base-content">Profit / Loss</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">-$1.2k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Gap $3.2k</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-2.5 border border-base-300 rounded-xl">
            <span class="text-sm font-medium text-base-content">Member Attendance</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-base-content">$14.8k</span>
              <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Gap $3.2k</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-2.5 border border-base-300 rounded-xl">
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
  readonly openAccordion = signal<string>('expired');

  toggleAccordion(id: string): void {
    this.openAccordion.update(current => current === id ? '' : id);
  }
}
