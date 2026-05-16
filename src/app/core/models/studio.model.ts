export interface StudioConfig {
  name: string;
  location: string;
  logoUrl?: string;
}

export interface DailySummary {
  winTitle: string;
  winDescription: string;
  winAmount: string;
  healthScore: number;
  healthStreak: string;
  healthChange: string;
  retentionLabel: string;
  retentionScore: number;
  retentionDetail: string;
}

export interface InfoBannerData {
  message: string;
}
