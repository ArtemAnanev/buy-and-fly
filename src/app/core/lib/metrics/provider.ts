import { METRIC_CONFIG, MetricConfig } from './metrica.interface';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { MetricService } from './metric.service';
import { YandexMetrika } from './yandex.metrika';
import { GoogleAnalytics } from './google-analytics';

export function provideMetrics(metricConfig: MetricConfig): Provider[] {
  return [
    {
      provide: METRIC_CONFIG,
      useValue: metricConfig,
    },
    MetricService,
    YandexMetrika,
    GoogleAnalytics,
    {
      provide: APP_INITIALIZER,
      useFactory: (metricService: MetricService) => {
        return () => metricService.init();
      },
      multi: true,
      deps: [MetricService],
    },
  ];
}
