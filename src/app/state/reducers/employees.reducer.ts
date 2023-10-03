import { createReducer, on } from '@ngrx/store';
import { EmployeesActions } from '../actions/employees.actions';
import { Employee } from '../../models/employee.model';

export const initialState: ReadonlyArray<Employee> = [];

export const employeesReducer = createReducer(
  initialState,
  on(EmployeesActions.fetchEmployees, (_state, { employees }): Employee[] => {
    return employees
  }),
  on(EmployeesActions.createEmployee, (state, { employee }): Employee[] => {
    return [
      ...state,
      employee
    ]
  }),
  on(EmployeesActions.updateEmployee, (state, { employee }): Employee[] => {
    return [
      ...state.filter(e => e.id !== employee.id),
      employee
    ]
  }),
  on(EmployeesActions.deleteEmployee, (state, { id }): Employee[] => {
    return state.filter(e => e.id !== id)
  }),
);
