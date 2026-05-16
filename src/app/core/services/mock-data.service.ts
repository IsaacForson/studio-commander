import { Injectable } from '@angular/core';
import {
  MetricSection,
  TrendChartData,
  ActionItem,
  Agent,
  KpiIntelligence,
  MarketingIntelligence,
  StudioConfig,
  DailySummary,
  InfoBannerData,
} from '../models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getStudioConfig(): StudioConfig {
    return { name: 'Gracie Jiu-Jitsu', location: 'Santa Monica, CA' };
  }

  getDailySummary(): DailySummary {
    return {
      winTitle: 'Win - Overnight',
      winDescription:
        "Sera's re-engagement campaign has 3 members responding since last night. Two more opened messages this morning.",
      winAmount: '+$840',
      healthScore: 74,
      healthStreak: '14-day healthy streak',
      healthChange: '+3 from yesterday',
      retentionLabel: 'Retention by Month',
      retentionScore: 88,
      retentionDetail: 'May \'26: 4.8%',
    };
  }

  getInfoBanner(): InfoBannerData {
    return {
      message:
        'Symon will have the full re-engagement response data ready — who responded, who may benefit from a personal call, and an updated view of your billing opportunity. Sera will have Day 3 ready when you approve it.',
    };
  }

  getMetricSections(): MetricSection[] {
    return [
      {
        title: '',
        counts: { total: 4, critical: 2, warning: 1, normal: 1 },
        metrics: [
          {
            id: 'profit-loss',
            title: 'Profit / Loss',
            value: -1200,
            displayValue: '-$1.2k',
            maxValue: 5000,
            status: 'critical',
            description: 'Below break-even. Target >$2k/mo',
            ctaLabel: 'Act Now',
          },
          {
            id: 'total-revenue',
            title: 'Total Revenue',
            value: 14800,
            displayValue: '$14.8k',
            maxValue: 18000,
            status: 'critical',
            description: '18% below RRR target of $18k',
            ctaLabel: 'Act Now',
          },
          {
            id: 'occupancy-cost',
            title: 'Occupancy Cost Ratio',
            value: 14.8,
            displayValue: '14.8%',
            maxValue: 100,
            status: 'warning',
            description: 'SM rents are high — target 10–13%',
            ctaLabel: 'Review',
          },
          {
            id: 'payroll-cost',
            title: 'Payroll Cost Ratio',
            value: 15.2,
            displayValue: '15.2%',
            maxValue: 100,
            status: 'normal',
            description: 'Healthy range 14–17%',
          },
        ],
      },
      {
        title: 'People & Operations',
        counts: { total: 5, critical: 1, warning: 3, normal: 1 },
        metrics: [
          {
            id: 'certified-leaders',
            title: 'Age 16+ Certified Leaders',
            value: 22,
            displayValue: '22.0%',
            maxValue: 100,
            status: 'normal',
            description: 'Green belt+ mentoring lower ranks',
          },
          {
            id: 'member-attendance',
            title: 'Eligible Member Attendance',
            value: 61,
            displayValue: '61.0%',
            maxValue: 100,
            status: 'warning',
            description: 'Lost 3 open mats — target 75%+',
            ctaLabel: 'Review',
          },
          {
            id: 'dva-score',
            title: 'DVA Score',
            value: 71,
            displayValue: '71.0%',
            maxValue: 100,
            status: 'critical',
            description: '12 dropped, only 3 added',
            ctaLabel: 'Act Now',
          },
          {
            id: 'aloa-score',
            title: 'ALOA Score',
            value: 14.8,
            displayValue: '14.8%',
            maxValue: 100,
            status: 'warning',
            description: 'Avg account length — target 24+ mo',
            ctaLabel: 'Review',
          },
          {
            id: 'community-partners',
            title: 'Community Network Partners',
            value: 6,
            displayValue: '6',
            maxValue: 15,
            status: 'warning',
            description: 'SM rents are high — target 10–13%',
            ctaLabel: 'Review',
          },
        ],
      },
      {
        title: 'Membership & Growth',
        counts: { total: 5, critical: 1, warning: 1, normal: 3 },
        metrics: [
          {
            id: 'num-members',
            title: '# of Members',
            value: 187,
            displayValue: '187',
            maxValue: 250,
            status: 'normal',
            description: 'Peak mat capacity. 150 above target',
          },
          {
            id: 'package-status',
            title: 'Member Package Status',
            value: 34,
            displayValue: '34 exp.',
            maxValue: 187,
            status: 'critical',
            description: 'Expired memberships not renewed',
            ctaLabel: 'Act Now',
          },
          {
            id: 'num-accounts',
            title: '# of Accounts',
            value: 162,
            displayValue: '162',
            maxValue: 200,
            status: 'warning',
            description: 'Family accounts — target 150',
          },
          {
            id: 'leads-source',
            title: 'Leads by Source',
            value: 41,
            displayValue: '41',
            maxValue: 100,
            status: 'warning',
            description: 'Digital referrals below SM target',
            ctaLabel: 'Review',
          },
          {
            id: 'training-compliance',
            title: 'Training Compliance',
            value: 94,
            displayValue: '94.0%',
            maxValue: 100,
            status: 'normal',
            description: 'Instructor curriculum completion',
          },
        ],
      },
    ];
  }

  getTrendChartData(metricId = 'profit-loss'): TrendChartData {
    const titles: Record<string, string> = {
      'profit-loss': 'Profit / Loss',
      'total-revenue': 'Total Revenue',
      'occupancy-cost': 'Occupancy Cost Ratio',
      'payroll-cost': 'Payroll Cost Ratio',
      'certified-leaders': 'Age 16+ Certified Leaders',
      'member-attendance': 'Eligible Member Attendance',
      'dva-score': 'DVA Score',
      'aloa-score': 'ALOA Score',
      'community-partners': 'Community Network Partners',
      'num-members': '# of Members',
      'package-status': 'Member Package Status',
      'num-accounts': '# of Accounts',
      'leads-source': 'Leads by Source',
      'training-compliance': 'Training Compliance',
    };

    return {
      title: titles[metricId] ?? 'Metric Trend',
      dateRange: 'Jan 2025 – Dec 2025',
      stats: [
        {
          label: 'Current Value',
          value: '-$1.2K',
          change: '0.5k (50%) since last period',
          changeDirection: 'down',
        },
        {
          label: 'Highest Value',
          value: '$0.82K',
          change: '$0.3k since last period',
          changeDirection: 'down',
        },
        {
          label: 'Lowest Value',
          value: '-$1.2K',
          change: '$0.3k since last period',
          changeDirection: 'down',
        },
      ],
      dataPoints: [
        { label: 'Jan', value: -800 },
        { label: 'Feb', value: -600 },
        { label: 'Mar', value: -200 },
        { label: 'Apr', value: 200 },
        { label: 'May', value: 500 },
        { label: 'Jun', value: 820 },
        { label: 'Jul', value: 600 },
        { label: 'Aug', value: 400 },
        { label: 'Sep', value: 100 },
        { label: 'Oct', value: -300 },
        { label: 'Nov', value: -800 },
        { label: 'Dec', value: -1200 },
      ],
    };
  }

  getActionItems(): ActionItem[] {
    return [
      {
        id: 'action-1',
        agentName: 'Symon',
        agentAvatar: '',
        title: 'Approve the 34-member outreach',
        description:
          'Found 34 expired packages representing up to $5,100 in potential billing recovery. List is ready for your review.',
        timestamp: new Date('2026-04-08T09:08:00'),
        ctaLabel: 'Review Recovery Campaign',
        ctaVariant: 'primary',
        hasAiIcon: true,
      },
      {
        id: 'action-2',
        agentName: 'Sera',
        agentAvatar: '',
        title: 'Send me 2 photos from last week',
        description:
          'I need action shots for the referral posts. Social proof drives 40% more sign-ups.',
        timestamp: new Date('2026-04-08T08:08:00'),
        ctaLabel: 'Send Photos',
        ctaVariant: 'warning',
      },
      {
        id: 'action-3',
        agentName: 'Symon',
        agentAvatar: '',
        title: 'Revenue is $3,200 short of target',
        description:
          'I need action shots for the referral posts. Social proof drives 40% more sign-ups.',
        timestamp: new Date('2026-04-07T09:08:00'),
        priority: 'critical',
        ctaLabel: 'Review Recovery Plan',
        ctaVariant: 'danger',
      },
    ];
  }

  getAgents(): Agent[] {
    return [
      {
        name: 'Symon',
        role: 'Operations Manager',
        agentRole: 'operations',
        avatar: '',
        badgeLabel: 'urgent',
        badgeCount: 4,
        badgeVariant: 'warning',
        sections: [
          {
            title: 'What I did this morning',
            icon: '⚙️',
            tasks: [
              {
                title: 'Audited all 187 member accounts',
                description:
                  'Found 34 expired packages representing up to $5,100 in potential billing recovery. List is ready for your review.',
                status: 'completed',
                statusLabel: 'Completed · 09:02AM',
                statusVariant: 'success',
              },
              {
                title: 'DVA Score dropped to 71% — Critical',
                description:
                  'The 34 expired packages representing up to $5,100 in potential billing recovery. List is ready for your review.',
                statusLabel: 'Rolled Sep',
                statusVariant: 'error',
                ctaLabel: '→ 50 details',
              },
              {
                title: 'Revenue is $3,200 short of target',
                description:
                  'The 34 expired packages representing up to $5,100 in potential billing recovery. It is made for your review.',
                ctaLabel: 'Review Recovery Plan',
                ctaAction: 'review-recovery',
              },
            ],
          },
          {
            title: 'What I\'m watching',
            tasks: [
              {
                title: 'Attendance slipped to 61%',
                description:
                  'The 34 expired packages representing up to $5,100 in potential billing recovery. List is ready for your review.',
                statusLabel: '↓ Monitoring Daily',
              },
            ],
          },
          {
            title: 'What I need from you',
            tasks: [
              {
                title: 'Approve the 34-member outreach',
                description:
                  'He 34 expired packages representing up to $5,100 in potential billing recovery. List is ready for your review.',
                ctaLabel: 'Review Recovery Campaign',
                ctaAction: 'review-campaign',
                hasAiIcon: true,
              },
            ],
          },
        ],
      },
      {
        name: 'Sera',
        role: 'Marketing Director',
        agentRole: 'marketing',
        avatar: '',
        badgeLabel: 'Live Campaigns',
        badgeCount: 4,
        badgeVariant: 'success',
        sections: [
          {
            title: 'What I did this morning',
            icon: '⚙️',
            tasks: [
              {
                title: 'Re-engagement sequence — live',
                description:
                  'Day 1 personal message went out to 34 lapsed members from your lost active accounts. 7 opens.',
                status: 'completed',
                statusLabel: 'Sent · 07:00AM',
                statusVariant: 'success',
                ctaLabel: '7 Opens',
              },
              {
                title: '8 new trial class leads captured',
                description:
                  'Instagram outreach starting to place leads. Follow-up messages sent to contact by within 4 minutes of each inquiry.',
              },
              {
                title: 'Parent referral program — launching tomorrow',
                description:
                  'Announcement ready for 187 active members. Each referral that results in enrollment earns a $50 credit.',
                status: 'pending',
                statusLabel: 'Scheduled · Launches 09:00AM Apr 10, 2026',
              },
            ],
          },
          {
            title: 'What I\'m watching',
            tasks: [
              {
                title: 'Marketing ROI at 1,640%',
                description:
                  'Every $1 spent returns $16.40 in member value. Re-engagement campaign can push over $3,000 this month.',
              },
            ],
          },
          {
            title: 'What I need from you',
            tasks: [
              {
                title: 'Send me 2 photos from last week',
                description:
                  'I need action shots for the referral posts. Social proof drives 40% more sign-ups.',
                ctaLabel: 'Send Photos',
                ctaAction: 'send-photos',
              },
            ],
          },
        ],
      },
    ];
  }

  getKpiIntelligence(): KpiIntelligence {
    return {
      agentName: 'Symon',
      summary:
        'Revenue is 18% below target, with 34 expired packages driving a $5.2k billing gap. DVA Score is critical — 12 students dropped this month, only 3 joined. Your immediate priorities: contact the 34 expired accounts today and investigate the DVA root cause.',
      kpis: [
        { label: 'Total Revenue', value: '$14.8k', target: '10% below specified target' },
        { label: 'DVA Score', value: '71%', change: '-24%', changeDirection: 'down' },
        { label: 'Expired Packages', value: '34', change: '31 expired', changeDirection: 'down' },
      ],
      actionLabel: 'Launch Recovery Outreach',
      actionDescription:
        'Symon identified 34 member accounts with expired packages this month. These are members who are still in the database but have not renewed. This situation means you have $5,100 in membership fees that are at risk of being lost. Take a 3-day phased automated outreach to recover by contacting with owner approval.',
    };
  }

  getMarketingIntelligence(): MarketingIntelligence {
    return {
      agentName: 'Sera',
      summary:
        'Symon has briefed me on 4 critical KPI flags — I have 3 campaigns live and ready.',
      campaigns: [
        {
          name: 'Personal re-reach to 34 expired members Day 1 from accounts. Day 1 down offer, Day 2 community repto.',
          sent: 34,
          target: 34,
          openRate: '66%',
          clickRate: '34%',
          status: 'live',
        },
      ],
      programs: [
        { name: 'Free Trial Class — Santa Monica', status: 'live' },
        { name: 'Parent Referral Program', status: 'scheduled', detail: 'Tomorrow' },
      ],
    };
  }
}
