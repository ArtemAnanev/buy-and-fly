import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, Signal, viewChild } from '@angular/core';
import { DisplayFn } from '@baf/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AsyncPipe, NgForOf } from '@angular/common';
import { InputComponent, InputControlComponent, InputDisplayDirective } from '../../input';
import { LabelComponent } from '../../label';
import { Observable, take, tap } from 'rxjs';

export type AutoCompleteVariant = Record<string, any> & { readonly id: number | string };

export interface AutoCompleteOptions {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly key: string;
  readonly displayFn: DisplayFn;
  readonly inputDisplayFn: DisplayFn;
}

@Component({
  selector: 'baf-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    InputComponent,
    NgForOf,
    AsyncPipe,
    InputControlComponent,
    InputDisplayDirective,
    LabelComponent,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'baf-input-control',
  },
})
export class AutocompleteComponent {
  readonly control = input.required<FormControl<string | AutoCompleteVariant>>();
  readonly options = input.required<AutoCompleteOptions>();
  readonly data = input.required<Observable<AutoCompleteVariant[]>>();

  readonly changed = output<string>();
  readonly opened = output();
  readonly closed = output();

  readonly input: Signal<ElementRef<HTMLInputElement>> = viewChild.required('input', { read: ElementRef<HTMLInputElement> });

  readonly open = signal<boolean>(false);

  get width(): string {
    return this.input().nativeElement.clientWidth > 200 ? `${this.input().nativeElement.clientWidth}px` : '200px';
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
    this.data()
      .pipe(
        take(1),
        tap((options) => {
          if (
            options.length &&
            this.control().value &&
            (typeof this.control().value === 'string' || JSON.stringify(this.control().value) !== JSON.stringify(options[0]))
          ) {
            this.control().patchValue(options[0], { emitEvent: false });
          }
        }),
      )
      .subscribe();
  }

  onInput(event: Event): void {
    this.changed.emit((event.target as HTMLInputElement).value);
  }

  onSelect(option: AutoCompleteVariant): void {
    this.control().patchValue(option, { emitEvent: false });
    this.closed.emit();
    this.open.set(false);
  }
}
