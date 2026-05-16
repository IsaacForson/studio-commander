import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabNavigationComponent } from '../../shared/components/tab-navigation/tab-navigation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, TabNavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-6 py-5 lg:px-10">
      <app-tab-navigation />
      <div class="mt-5">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class DashboardComponent {}
