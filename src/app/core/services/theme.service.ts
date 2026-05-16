import { Injectable, signal, effect, computed } from '@angular/core';
import { THEMES, ThemeName } from '../constants/theme.constants';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'sc-theme';
  readonly theme = signal<ThemeName>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === THEMES.dark);

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(this.storageKey, t);
    });
  }

  toggle(): void {
    this.theme.update(t => t === THEMES.light ? THEMES.dark : THEMES.light);
  }

  private getInitialTheme(): ThemeName {
    const stored = localStorage.getItem(this.storageKey) as ThemeName | null;
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.dark
      : THEMES.light;
  }
}
