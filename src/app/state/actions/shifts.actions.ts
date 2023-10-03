import { createActionGroup, props } from '@ngrx/store'
import { Shift } from '../../models/shift.model'
import { Employee } from 'src/app/models/employee.model'
import { ShiftTemplate } from 'src/app/models/shift-template.model'

export const ShiftsActions = createActionGroup({
  source: 'Shifts',
  events: {
    'Fetch Shifts': props<{ shifts: Shift[] }>(),
    'Create Shift': props<{ shift: Shift }>(),
    'Update Shift': props<{ id: Shift['id'], shift: Shift }>(),
    'Delete Shift': props<{ id: Shift['id'] }>(),
    'Update Employee': props<{
      currentEmployeeId: Employee['id'],
      newEmployee: Employee
    }>(),
    'Delete Shifts by Employee': props<{ id: Employee['id'] }>(),
    'Update Template': props<{
      currentTemplateId: ShiftTemplate['id'],
      newTemplate: ShiftTemplate
    }>(),
    'Delete Shifts by Template': props<{ id: ShiftTemplate['id'] }>()
  }
})
