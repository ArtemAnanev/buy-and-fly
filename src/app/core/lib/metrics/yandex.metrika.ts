import { Injectable } from '@angular/core';

declare global {
  interface window {
    readonly ym?: (...params: unknown[]) => void;
  }
}

@Injectable()
export class YandexMetrika {}
