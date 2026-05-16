export type MetricStatus = 'critical' | 'warning' | 'normal';

export interface Metric {
  id: string;
  title: string;
  value: number;
  displayValue: string;
  maxValue: number;
  status: MetricStatus;
  description: string;
  ctaLabel?: string;
  ctaAction?: string;
}

export interface MetricSection {
  title: string;
  metrics: Metric[];
  counts: { total: number; critical: number; warning: number; normal: number };
}

export interface TrendDataPoint {
  label: string;
  value: number;
}

export interface TrendStat {
  label: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down';
}

export interface TrendChartData {
  title: string;
  dateRange: string;
  stats: TrendStat[];
  dataPoints: TrendDataPoint[];
}
