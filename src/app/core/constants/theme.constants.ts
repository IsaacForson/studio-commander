import { MetricStatus } from '../models';

export const STATUS_COLORS: Record<MetricStatus, { border: string; text: string; bg: string; fill: string }> = {
  critical: {
    border: 'border-status-critical',
    text: 'text-status-critical',
    bg: 'bg-status-critical-bg',
    fill: '#dc2626',
  },
  warning: {
    border: 'border-status-warning',
    text: 'text-status-warning',
    bg: 'bg-status-warning-bg',
    fill: '#f59e0b',
  },
  normal: {
    border: 'border-status-normal',
    text: 'text-status-normal',
    bg: 'bg-status-normal-bg',
    fill: '#16a34a',
  },
};

export const THEMES = {
  light: 'studio-light',
  dark: 'studio-dark',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];
