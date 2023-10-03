import { Component, OnDestroy } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Subscription, BehaviorSubject } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'

import { CALENDAR_OPTIONS } from './../../consts';
import { ShiftService } from 'src/app/services/shift.service';
import { ShiftFormComponent } from 'src/app/components/shift-form/shift-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  shiftsSub?: Subscription;
  events = new BehaviorSubject<EventInput[]>([])
  overlayRef: OverlayRef

  constructor (
    private shiftService: ShiftService,
    private overlay: Overlay
  ) {
    this.shiftsSub = this.shiftService.shifts$.subscribe(shifts => {
      // TODO: Evaluate filtering shifts by _args.start and _args.end
      this.events.next(shifts.map(this.shiftService.shiftAsEventInput))
    })

    // Create overlay centered in the screen (with backdrop)
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true
    })
  }



  calendarOptions: CalendarOptions = {
    ...CALENDAR_OPTIONS,
    plugins: [
      interactionPlugin,
      timeGridPlugin
    ],
    // TODO: Validate shift change on drop or remove functionality
    eventAllow: (droppedSpan, event) => {
      if (!event || !event.start || !event.end) return false

      const { start, end } = event

      return droppedSpan.start.toTimeString() === start.toTimeString() &&
        droppedSpan.end.toTimeString() === end.toTimeString()
    },
    // Add Schedule Shift button in the footer toolbar
    customButtons: {
      scheduleShift: {
        text: 'Schedule Shift',
        click: this.openShiftForm.bind(this)
      }
    },
    footerToolbar: {
      right: 'scheduleShift'
    },
  };

  removeShift(id?: string) {
    if (id) {
      this.shiftService.removeShift(parseInt(id))
    }
  }

  openShiftForm () {
    const form = new ComponentPortal(ShiftFormComponent)
    const formRef = this.overlayRef.attach(form)
    const subs: Subscription[] = []

    // Close modal
    subs.push(formRef.instance.closed.subscribe(isClosed => {
      if (isClosed) {
        subs.forEach(sub => sub.unsubscribe())
        this.overlayRef.detach()
      }
    }))
    // Save shift and close on submit
    subs.push(formRef.instance.submittedData.subscribe(shift => {
      if (shift) {
        this.shiftService.saveShift(shift)
        subs.forEach(sub => sub.unsubscribe())
        this.overlayRef.detach()
      }
    }))
  }

  ngOnDestroy () {
    if (this.shiftsSub) {
      this.shiftsSub.unsubscribe()
    }
  }
}
