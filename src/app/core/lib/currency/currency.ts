import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import type { Provider } from '@angular/core';

export function provideCurrency(currencyCode: string): Provider {
  return {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: currencyCode,
  };
}
