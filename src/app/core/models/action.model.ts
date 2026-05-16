export type ActionPriority = 'critical' | 'urgent' | 'normal';
export type ActionCtaVariant = 'primary' | 'warning' | 'danger';

export interface ActionItem {
  id: string;
  agentName: string;
  agentAvatar: string;
  title: string;
  description: string;
  timestamp: Date;
  priority?: ActionPriority;
  ctaLabel: string;
  ctaVariant: ActionCtaVariant;
  hasAiIcon?: boolean;
}

export type ActionSortField = 'date' | 'priority';
export type ActionSortDirection = 'asc' | 'desc';

export interface ActionSort {
  field: ActionSortField;
  direction: ActionSortDirection;
  label: string;
}
