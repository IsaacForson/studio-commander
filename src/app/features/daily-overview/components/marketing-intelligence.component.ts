import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MarketingIntelligence } from '../../../core/models';
import { ActionButtonComponent } from '../../../shared/components/action-button/action-button.component';

@Component({
  selector: 'app-marketing-intelligence',
  standalone: true,
  imports: [ActionButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl overflow-hidden border border-base-300">
      <!-- Teal header bar -->
      <div class="bg-teal-600 text-white px-5 py-3 flex items-center gap-2">
        <span>✦</span>
        <h3 class="text-sm font-bold">Automated Marketing Intelligence</h3>
      </div>

      <!-- White body -->
      <div class="bg-base-100 p-5">
        <!-- Agent -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">S</div>
          <span class="text-sm font-bold text-base-content">Sera</span>
        </div>

        <!-- Summary with bold keywords -->
        <p class="text-sm text-base-content leading-relaxed mb-4">
          <span class="text-red-600 font-semibold">Symon</span> has briefed me on <strong>4 critical KPI flags</strong> — I have <strong>3 campaigns live</strong> and ready.
        </p>

        <p class="text-sm text-base-content/80 leading-relaxed mb-2">
          The <strong>34-member re-engagement sequence</strong> launched <strong>Monday</strong> and <strong>Day 3 goes out tomorrow.</strong>
        </p>
        <hr class="border-base-300 my-3" />
        <p class="text-sm text-base-content/80 leading-relaxed mb-2">
          <strong>Free Trial Class</strong> push is generating leads in the <strong>Santa Monica</strong> market.
        </p>
        <hr class="border-base-300 my-3" />
        <p class="text-sm text-base-content/80 leading-relaxed mb-5">
          <strong>Parent referral program launches tomorrow</strong> targeting your <strong>187 active members.</strong>
        </p>

        <!-- KPIs That Triggered This Alert -->
        <h4 class="text-xs font-semibold text-base-content/50 mb-3">KPIs That Triggered This Alert</h4>

        <!-- Campaign Card -->
        <div class="border border-base-300 rounded-xl overflow-hidden mb-4">
          <div class="flex items-center justify-between px-4 py-3 bg-base-200/30">
            <span class="text-sm font-bold text-base-content">34-Member Re-Engagement Sequence</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Live
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
              </svg>
            </div>
          </div>
          <div class="px-4 py-3">
            <p class="text-xs text-base-content/60 mb-3">Personal outreach to all 34 expired members. Day 1 from instructor, Day 3 return offer, Day 7 community update.</p>
            <div class="grid grid-cols-4 gap-3">
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
          </div>
          <div class="px-4 pb-3">
            <app-action-button label="View Campaign Details" variant="ghost" />
          </div>
        </div>

        <!-- Programs -->
        <div class="border border-base-300 rounded-xl overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-base-300">
            <span class="text-sm font-bold text-base-content">Free Trial Class — Santa Monica</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Live
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-3">
            <span class="text-sm font-bold text-base-content">Parent Referral Program</span>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full bg-base-200 text-base-content/70 font-medium">Scheduled</span>
              <span class="text-xs text-base-content/50 flex items-center gap-1">
                📅 Tomorrow
              </span>
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
export class MarketingIntelligenceComponent {
  readonly data = input.required<MarketingIntelligence>();
}
