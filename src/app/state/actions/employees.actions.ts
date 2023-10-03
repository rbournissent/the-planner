import { createActionGroup, props } from '@ngrx/store'
import { Employee } from '../../models/employee.model'

export const EmployeesActions = createActionGroup({
  source: 'Employees',
  events: {
    'Fetch Employees': props<{ employees: Employee[] }>(),
    'Create Employee': props<{ employee: Employee }>(),
    'Update Employee': props<{ employee: Employee }>(),
    'Delete Employee': props<{ id: Employee['id'] }>()
  }
})
