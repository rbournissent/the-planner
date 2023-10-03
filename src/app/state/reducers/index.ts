import {
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';

import { Employee } from 'src/app/models/employee.model';
import { employeesReducer } from './employees.reducer';

export interface State {
  employees: ReadonlyArray<Employee>
}

export const reducers: ActionReducerMap<State> = {
  employees: employeesReducer,
};

export const selectEmployees = createFeatureSelector<ReadonlyArray<Employee>>('employees');
