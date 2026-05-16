import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { MarketingIntelligence } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-marketing-intelligence',
  standalone: true,
  imports: [ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl overflow-hidden border-2 border-teal-400">
      <!-- Teal header bar -->
      <div class="bg-teal-600 text-white px-5 py-3 flex items-center gap-2">
        <span>✦</span>
        <h3 class="text-sm font-bold">Automated Marketing Intelligence</h3>
      </div>

      <!-- White body -->
      <div class="bg-base-100 p-5">
        <!-- Agent -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <span class="text-gray-500">👤</span>
          </div>
          <span class="text-base font-bold text-base-content">Sera</span>
        </div>

        <!-- Summary in bordered card -->
        <div class="border border-base-300 rounded-xl p-4 mb-4 space-y-4">
          <p class="text-sm text-base-content leading-relaxed">
            <span class="text-amber-600 font-semibold">Symon</span> has briefed me on <strong>4 critical KPI flags</strong> — I have <strong>3 campaigns live</strong> and ready.
          </p>
          <hr class="border-base-300" />
          <p class="text-sm text-base-content/80 leading-relaxed">
            The <strong>34-member re-engagement sequence</strong> launched <strong>Monday</strong> and <strong>Day 3 goes out tomorrow.</strong>
          </p>
          <hr class="border-base-300" />
          <p class="text-sm text-base-content/80 leading-relaxed">
            <strong>Free Trial Class</strong> push is generating leads in the <strong>Santa Monica</strong> market.
          </p>
          <hr class="border-base-300" />
          <p class="text-sm text-base-content/80 leading-relaxed">
            <strong>Parent referral program launches tomorrow</strong> targeting your <strong>187 active members.</strong>
          </p>
        </div>

        <!-- KPIs That Triggered This Alert -->
        <h4 class="text-xs font-semibold text-base-content/50 mb-3">KPIs That Triggered This Alert</h4>

        <!-- 34-Member Re-Engagement Sequence accordion (default open) -->
        <div class="border border-base-300 rounded-xl mb-2 overflow-hidden">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('reengagement')"
          >
            <span class="text-sm font-bold text-base-content">34-Member Re-Engagement Sequence</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Live
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'reengagement'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>

          @if (openAccordion() === 'reengagement') {
            <div class="px-4 pb-4 border-t border-base-300">
              <p class="text-xs text-base-content/60 my-3 leading-relaxed">Personal outreach to all 34 expired members. Day 1 from instructor, Day 3 return offer, Day 7 community update.</p>
              <div class="grid grid-cols-4 gap-2 mb-4">
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Conversions</p>
                  <p class="text-base font-bold text-base-content">7</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Target</p>
                  <p class="text-base font-bold text-base-content">34</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Open Rate</p>
                  <p class="text-base font-bold text-base-content">68%</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Click Rate</p>
                  <p class="text-base font-bold text-base-content">34%</p>
                </div>
              </div>
              <app-action-button label="View Campaign Details" variant="primary" />
            </div>
          }
        </div>

        <!-- Free Trial Class accordion -->
        <div class="border border-base-300 rounded-xl mb-2 overflow-hidden">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('trial')"
          >
            <span class="text-sm font-bold text-base-content">Free Trial Class — Santa Monica</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Live
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'trial'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          @if (openAccordion() === 'trial') {
            <div class="px-4 pb-4 border-t border-base-300">
              <p class="text-xs text-base-content/60 my-3 leading-relaxed">Free trial class campaign targeting new leads in the Santa Monica area through Instagram ads and Google local search. Walk-ins and online bookings are tracked automatically.</p>
              <div class="grid grid-cols-4 gap-2 mb-4">
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Leads</p>
                  <p class="text-base font-bold text-base-content">6</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Booked</p>
                  <p class="text-base font-bold text-base-content">4</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Show Rate</p>
                  <p class="text-base font-bold text-base-content">75%</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Cost/Lead</p>
                  <p class="text-base font-bold text-base-content">$12</p>
                </div>
              </div>
              <app-action-button label="View Campaign Details" variant="primary" />
            </div>
          }
        </div>

        <!-- Parent Referral Program accordion -->
        <div class="border border-base-300 rounded-xl overflow-hidden">
          <button
            class="w-full flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
            (click)="toggleAccordion('referral')"
          >
            <span class="text-sm font-bold text-base-content">Parent Referral Program</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-base-200 text-base-content/70 font-medium">Scheduled</span>
              <span class="text-xs text-base-content/50 flex items-center gap-1">📅 Tomorrow</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30 transition-transform" [class.rotate-180]="openAccordion() === 'referral'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          @if (openAccordion() === 'referral') {
            <div class="px-4 pb-4 border-t border-base-300">
              <p class="text-xs text-base-content/60 my-3 leading-relaxed">Referral program announcement goes out to all 187 active members tomorrow at 09:00AM. Each successful referral that results in enrollment earns a $50 studio credit for the referring member.</p>
              <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Target Audience</p>
                  <p class="text-base font-bold text-base-content">187</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Reward</p>
                  <p class="text-base font-bold text-base-content">$50</p>
                </div>
                <div class="border border-base-300 rounded-lg p-2.5">
                  <p class="text-[10px] text-base-content/50 mb-0.5">Launch</p>
                  <p class="text-base font-bold text-base-content">Tomorrow</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class MarketingIntelligenceComponent {
  readonly data = input.required<MarketingIntelligence>();
  readonly openAccordion = signal<string>('reengagement');

  toggleAccordion(id: string): void {
    this.openAccordion.update(current => current === id ? '' : id);
  }
}
