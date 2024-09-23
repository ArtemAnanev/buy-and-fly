import { Directive, inject, input } from '@angular/core';
import { ExtraClassService, toClass } from '@baf/core';
import { Width } from './types';

@Directive({
  selector: '[bafWidth]',
  standalone: true,
  providers: [ExtraClassService],
})
export class WidthDirective {
  private readonly extraClassService = inject(ExtraClassService);

  readonly width = input<Width, Width>(undefined, {
    alias: 'bafWidth',
    transform: (value) => {
      this.extraClassService.update('width', toClass(value, 'width'));
      return value;
    },
  });
}
