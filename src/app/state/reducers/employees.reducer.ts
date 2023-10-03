import { createReducer, on } from '@ngrx/store';
import { EmployeesActions } from '../actions/employees.actions';
import { Employee } from '../../models/employee.model';

export const initialState: ReadonlyArray<Employee> = [];

export const employeesReducer = createReducer(
  initialState,
  on(EmployeesActions.fetchEmployees, (_state, { employees }): Employee[] => {
    return employees
  }),
);
