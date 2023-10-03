import {
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';

import { Employee } from 'src/app/models/employee.model';
import { employeesReducer } from './employees.reducer';
import { ShiftTemplate } from 'src/app/models/shift-template.model';
import { templatesReducer } from './shift-templates.reducer';
import { Shift } from 'src/app/models/shift.model';
import { shiftsReducer } from './shifts.reducer';

export interface State {
  employees: ReadonlyArray<Employee>
  templates: ReadonlyArray<ShiftTemplate>
  shifts: ReadonlyArray<Shift>
}

export const reducers: ActionReducerMap<State> = {
  employees: employeesReducer,
  templates: templatesReducer,
  shifts: shiftsReducer,
};

export const selectEmployees = createFeatureSelector<ReadonlyArray<Employee>>('employees');

export const selectTemplates = createFeatureSelector<ReadonlyArray<ShiftTemplate>>('templates');

export const selectShifts = createFeatureSelector<ReadonlyArray<Shift>>('shifts');
