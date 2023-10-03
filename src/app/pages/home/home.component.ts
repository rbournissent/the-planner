import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const mockedEvents = [{
  title: 'John Doe - Morning',
  start: new Date('2023-10-03 8:30'),
  end: new Date('2023-10-03 14:30')
}, {
  title: 'Rodrigo - Afternoon',
  start: new Date('2023-10-03 12:30'),
  end: new Date('2023-10-03 18:30')
}]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    aspectRatio: 2.2,
    plugins: [
      interactionPlugin,
      timeGridPlugin
    ],
    // Week starts on Monday
    firstDay: 1,
    businessHours: {
      daysOfWeek: [1,2,3,4,5], // Monday - Friday
      startTime: '09:00',
      endTime: '18:00'
    },
    // Test events
    events: mockedEvents,
    editable: true,
    eventDurationEditable: false,
    nowIndicator: true,
    allDaySlot: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek'
    }
  };
}
