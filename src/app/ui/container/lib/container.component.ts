import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FluidDirective } from './fluid.directive';
import { MobileDirective } from './mobile.directive';
import { AlignDirective } from '@baf/ui/utils';

@Component({
  selector: 'baf-container',
  standalone: true,
  imports: [RouterOutlet],
  template: `<ng-content />`,
  styleUrl: 'container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baf-container',
  },
  hostDirectives: [
    {
      directive: FluidDirective,
      inputs: ['bafFluid'],
    },
    {
      directive: MobileDirective,
      inputs: ['bafMobile'],
    },
    {
      directive: AlignDirective,
      inputs: ['bafAlign'],
    },
  ],
})
export class ContainerComponent {}
