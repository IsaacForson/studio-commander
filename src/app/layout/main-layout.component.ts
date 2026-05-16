import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { InfoBannerComponent } from '../shared/components/info-banner/info-banner.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MockDataService } from '../core/services/mock-data.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    InfoBannerComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen flex-col bg-base-200">
      <app-header />
      <main class="flex-1 bg-base-200">
        <router-outlet />
      </main>
      <app-info-banner [message]="infoBanner.message" />
      <app-footer />
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class MainLayoutComponent {
  private readonly mockData = inject(MockDataService);
  readonly infoBanner = this.mockData.getInfoBanner();
}
