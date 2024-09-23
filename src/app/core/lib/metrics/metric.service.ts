import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

import { GoogleAnalytics } from './google-analytics';
import { YandexMetrika } from './yandex.metrika';

export interface MetricOptions {
  readonly [key: string]: unknown;
  readonly ym?: Record<string, unknown>;
  readonly ga?: Record<string, unknown>;
}

export function extractOptions(options?: MetricOptions): { readonly ym?: Record<string, unknown>; readonly ga?: Record<string, unknown> } {
  let { ym, ga } = options ?? {};
  if (options) {
    if (!ym && !ga) {
      ym = options;
      ga = options;
    }
  }
  return { ym, ga };
}

@Injectable()
export class MetricService {
  private readonly router = inject(Router);
  private readonly yandexMetrika = inject(YandexMetrika);
  private readonly googleAnalytics = inject(GoogleAnalytics);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event) => this.navigation(event.urlAfterRedirects)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  init(customerId?: string | number) {
    this.set({
      ga: customerId ? { user_id: customerId } : undefined,
      ym: customerId ? { UserId: customerId } : undefined,
    });
  }

  navigation(url: string): void {
    this.googleAnalytics.sendNavigation(url);
  }

  send(action: string, options?: MetricOptions): void {
    const params = extractOptions(options);

    this.googleAnalytics.sendEvent(action, params.ga);
    this.yandexMetrika.reachGoal(action, params.ym);
  }

  set(options: MetricOptions): void {
    const params = extractOptions(options);

    if (params.ym) {
      this.yandexMetrika.set(params.ym);
    }
    if (params.ga) {
      this.googleAnalytics.set(params.ga);
    }
  }
}
