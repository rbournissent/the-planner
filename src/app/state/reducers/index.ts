import {
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';

import { Employee } from 'src/app/models/employee.model';
import { employeesReducer } from './employees.reducer';
import { ShiftTemplate } from 'src/app/models/shift-template.model';
import { templatesReducer } from './shift-templates.reducer';

export interface State {
  employees: ReadonlyArray<Employee>
  templates: ReadonlyArray<ShiftTemplate>
}

export const reducers: ActionReducerMap<State> = {
  employees: employeesReducer,
  templates: templatesReducer,
};

export const selectEmployees = createFeatureSelector<ReadonlyArray<Employee>>('employees');

export const selectTemplates = createFeatureSelector<ReadonlyArray<ShiftTemplate>>('templates');
