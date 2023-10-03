import { CalendarOptions } from '@fullcalendar/core';

export const CALENDAR_OPTIONS:CalendarOptions = {
  initialView: 'timeGridWeek',
  aspectRatio: 2.2,
  // Week starts on Monday
  firstDay: 1,
  businessHours: {
    daysOfWeek: [1,2,3,4,5], // Monday - Friday
    startTime: '09:00',
    endTime: '18:00'
  },
  editable: true,
  eventDurationEditable: false,
  nowIndicator: true,
  allDaySlot: false,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridDay,timeGridWeek'
  },
  buttonText: {
    today: 'Today',
    day: 'Day',
    week: 'Week'
  },

  dragRevertDuration: 150
}
