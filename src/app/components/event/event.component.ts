import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() shift!: { event: EventImpl }
  @Output() remove = new EventEmitter<EventInput['id']>()
}
