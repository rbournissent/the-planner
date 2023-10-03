import { createActionGroup, props } from '@ngrx/store'
import { Shift } from '../../models/shift.model'
import { Employee } from 'src/app/models/employee.model'
import { ShiftTemplate } from 'src/app/models/shift-template.model'

export const ShiftsActions = createActionGroup({
  source: 'Shifts',
  events: {
    'Fetch Shifts': props<{ shifts: Shift[] }>(),
    'Delete Shift': props<{ id: Shift['id'] }>(),
  }
})
