import { AfterViewInit, Directive, ElementRef, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive()
export class ButtonBase implements AfterViewInit, OnDestroy {
  protected readonly elementRef = inject(ElementRef);
  private readonly focusMonitor = inject(FocusMonitor);
  private isDisabled = false;

  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: string | boolean | null | undefined) {
    const disabled = coerceBooleanProperty(value);
    if (disabled !== this.isDisabled) {
      this.isDisabled = disabled;
    }
  }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef, true);
  }

  ngOnDestroy() {
    this.focusMonitor.monitor(this.elementRef);
  }

  focus(origin: FocusOrigin = 'program', options?: FocusOptions): void {
    if (origin) {
      this.focusMonitor.focusVia(this.elementRef.nativeElement, origin, options);
    } else {
      this.elementRef.nativeElement.focus(options);
    }
  }
}

@Directive()
export class AnchorBase extends ButtonBase implements OnDestroy, OnInit {
  private readonly ngZone = inject(NgZone);

  protected readonly haltDisabledEvents = (event: Event) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener('click', this.haltDisabledEvents);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.elementRef.nativeElement.removeEventListener('click', this.haltDisabledEvents);
  }
}
