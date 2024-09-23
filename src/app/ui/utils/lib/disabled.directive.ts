import { Directive, inject, input } from '@angular/core';
import { CoerceBoolean, ExtraClassService } from '@baf/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[disabled]',
  standalone: true,
  providers: [ExtraClassService],
})
export class DisabledDirective {
  private readonly extraClassService = inject(ExtraClassService);

  readonly disabled = input<CoerceBoolean, CoerceBoolean>(undefined, {
    transform: (value) => {
      this.extraClassService.patch('is-disabled', coerceBooleanProperty(value));
      return value;
    },
  });
}
