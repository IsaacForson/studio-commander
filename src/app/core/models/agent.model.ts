export type AgentRole = 'operations' | 'marketing';

export interface AgentTask {
  title: string;
  description: string;
  status?: 'completed' | 'in-progress' | 'pending';
  statusLabel?: string;
  statusVariant?: 'success' | 'warning' | 'error';
  ctaLabel?: string;
  ctaAction?: string;
  hasAiIcon?: boolean;
}

export interface AgentSection {
  title: string;
  icon?: string;
  tasks: AgentTask[];
}

export interface Agent {
  name: string;
  role: string;
  agentRole: AgentRole;
  avatar: string;
  badgeLabel: string;
  badgeCount: number;
  badgeVariant: 'warning' | 'success' | 'info';
  sections: AgentSection[];
}

export interface KpiRow {
  label: string;
  value: string;
  target?: string;
  change?: string;
  changeDirection?: 'up' | 'down';
}

export interface KpiIntelligence {
  agentName: string;
  summary: string;
  kpis: KpiRow[];
  actionLabel?: string;
  actionDescription?: string;
}

export interface CampaignRow {
  name: string;
  sent?: number;
  target?: number;
  openRate?: string;
  clickRate?: string;
  status: 'live' | 'scheduled' | 'draft';
}

export interface MarketingIntelligence {
  agentName: string;
  summary: string;
  campaigns: CampaignRow[];
  programs: { name: string; status: string; detail?: string }[];
}
