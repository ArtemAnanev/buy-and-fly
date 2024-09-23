import { Directive, inject, input } from '@angular/core';
import { CoerceBoolean, ExtraClassService } from '@baf/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: 'baf-container[bafFluid]',
  standalone: true,
  providers: [ExtraClassService],
})
export class FluidDirective {
  private readonly extraClassService = inject(ExtraClassService);

  readonly fluid = input<CoerceBoolean, CoerceBoolean>(undefined, {
    alias: 'bafFluid',
    transform: (value) => {
      this.extraClassService.patch('fluid', coerceBooleanProperty(value));
      return value;
    },
  });
}
