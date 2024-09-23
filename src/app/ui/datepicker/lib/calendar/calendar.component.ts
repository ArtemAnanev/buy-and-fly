import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CalendarDaysPipe } from './calendar-days.pipe';
import { ChevronLeftComponent, ChevronRightComponent } from '../../../icons';
import { IconButtonComponent } from '../../../buttons';

export interface CalendarConfig {
  readonly date: Date;
  readonly firstDay: Date;
  readonly lastDay: Date;
  readonly year: number;
  readonly month: number;
  readonly active?: number;
}

export interface CalendarSelected {
  readonly day: number;
  readonly date: Date;
  readonly format: string;
}

@Component({
  selector: 'baf-calendar',
  standalone: true,
  imports: [DatePipe, CalendarDaysPipe, IconButtonComponent, AsyncPipe, ChevronRightComponent, ChevronLeftComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {}
