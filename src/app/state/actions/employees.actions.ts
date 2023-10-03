import { createActionGroup, props } from '@ngrx/store'
import { Employee } from '../../models/employee.model'

export const EmployeesActions = createActionGroup({
  source: 'Employees',
  events: {
    'Fetch Employees': props<{ employees: Employee[] }>(),
  }
})
