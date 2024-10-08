import { ChangeDetectorRef, DestroyRef, Directive, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Directive({
  selector: '[bafExtractChanges]',
  standalone: true,
})
export class ExtractChangesDirective implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly control = input.required<UntypedFormControl | UntypedFormGroup>();

  ngOnInit(): void {
    this.control()
      .valueChanges.pipe(
        tap(() => this.changeDetectorRef.markForCheck()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
