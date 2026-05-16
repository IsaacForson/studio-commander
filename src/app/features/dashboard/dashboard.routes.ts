import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'daily-overview',
    pathMatch: 'full',
  },
  {
    path: 'daily-overview',
    loadComponent: () =>
      import('../daily-overview/daily-overview.component').then(m => m.DailyOverviewComponent),
  },
  {
    path: 'key-metrics',
    loadComponent: () =>
      import('../key-metrics/key-metrics.component').then(m => m.KeyMetricsComponent),
  },
  {
    path: 'actions',
    loadComponent: () =>
      import('../actions/actions.component').then(m => m.ActionsComponent),
  },
];
