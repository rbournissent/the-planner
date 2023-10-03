import { Component, OnDestroy } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Subscription, BehaviorSubject } from 'rxjs';

import { CALENDAR_OPTIONS } from './../../consts';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  shiftsSub?: Subscription;
  events = new BehaviorSubject<EventInput[]>([])

  constructor (private shiftService: ShiftService) {
    this.shiftsSub = this.shiftService.shifts$.subscribe(shifts => {
      // TODO: Evaluate filtering shifts by _args.start and _args.end
      this.events.next(shifts.map(this.shiftService.shiftAsEventInput))
    })
  }

  calendarOptions: CalendarOptions = {
    ...CALENDAR_OPTIONS,
    plugins: [
      interactionPlugin,
      timeGridPlugin
    ],
    eventAllow: (droppedSpan, event) => {
      if (!event || !event.start || !event.end) return false

      const { start, end } = event

      return droppedSpan.start.toTimeString() === start.toTimeString() &&
        droppedSpan.end.toTimeString() === end.toTimeString()
    },
  };

  removeShift(id?: string) {
    if (id) {
      this.shiftService.removeShift(parseInt(id))
    }
  }

  ngOnDestroy () {
    if (this.shiftsSub) {
      this.shiftsSub.unsubscribe()
    }
  }
}
