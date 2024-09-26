import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { MaskFn } from '@baf/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DEFAULT_MASK_FN, InputComponent, InputControlComponent, InputMaskDirective } from '../../input';
import { LabelComponent } from '../../label';
import { CalendarComponent, CalendarSelected } from './calendar/calendar.component';
import { DOCUMENT } from '@angular/common';
import { trigger } from '@angular/animations';

export interface DatepickerOptions {
  readonly label: string;
  readonly placeholder?: string;
  readonly id: string;
  readonly maskForm: MaskFn;
  readonly maskTo: MaskFn;
  readonly mask: string;
}

@Component({
  selector: 'baf-datepicker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    InputComponent,
    InputControlComponent,
    LabelComponent,
    CalendarComponent,
    InputMaskDirective,
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baf-datepicker',
  },
})
export class DatepickerComponent {
  private readonly document = inject(DOCUMENT);

  readonly control = input.required<FormControl<string>>();
  readonly options = input.required<DatepickerOptions>();
  readonly changed = output<string>();
  readonly opened = output();
  readonly closed = output();
  readonly input = ViewChild('input', { read: ElementRef<HTMLInputElement> });
  readonly open = signal<boolean>(false);
  readonly maskFn = DEFAULT_MASK_FN;

  get width(): string {
    return this.document.body.clientWidth > 360 ? `360px` : '280px';
  }

  onOpen(): void {
    if (!this.open()) {
      this.open.set(true);
      this.opened.emit();
    }
  }

  onClose(): void {
    this.closed.emit();
    this.open.set(false);
  }

  onInput(event: Event): void {
    this.changed.emit((event.target as HTMLInputElement).value);
  }

  onSelected(option: CalendarSelected): void {
    this.control().patchValue(option.format);
    this.closed.emit();
    this.open.set(false);
  }

  protected readonly trigger = trigger;
}
