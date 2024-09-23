import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnchorBase, ButtonBase } from '../base/button-base';
import { DisabledDirective, ExtraSizeDirective, ModeDirective, WidthDirective } from '@baf/ui/utils';

@Component({
  selector: 'button[baf-button]',
  standalone: true,
  template: '<ng-content/>',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baf-button',
  },
  hostDirectives: [
    {
      directive: ModeDirective,
      inputs: ['bafMode'],
    },
    {
      directive: ExtraSizeDirective,
      inputs: ['bafSize'],
    },
    {
      directive: DisabledDirective,
      inputs: ['disabled'],
    },
    {
      directive: WidthDirective,
      inputs: ['bafWidth'],
    },
  ],
})
export class ButtonComponent extends ButtonBase {}

@Component({
  selector: 'a[baf-button]',
  standalone: true,
  template: '<ng-content/>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baf-button',
  },
  hostDirectives: [
    {
      directive: ModeDirective,
      inputs: ['bafMode'],
    },
    {
      directive: ExtraSizeDirective,
      inputs: ['bafSize'],
    },
    {
      directive: DisabledDirective,
      inputs: ['disabled'],
    },
    {
      directive: WidthDirective,
      inputs: ['bafWidth'],
    },
  ],
})
export class AnchorComponent extends AnchorBase {}
