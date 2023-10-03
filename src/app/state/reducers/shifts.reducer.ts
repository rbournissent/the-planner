import { createReducer, on } from '@ngrx/store';
import { ShiftsActions } from '../actions/shifts.actions';
import { Shift } from '../../models/shift.model';

export const initialState: ReadonlyArray<Shift> = [];

export const shiftsReducer = createReducer(
  initialState,
  on(ShiftsActions.fetchShifts, (_state, { shifts }): Shift[] => {
    return shifts
  }),
  on(ShiftsActions.createShift, (state, { shift }): Shift[] => {
    return [
      ...state,
      shift
    ]
  }),
  on(ShiftsActions.updateShift, (state, { id, shift }): Shift[] => {
    return state.map(s => {
      if (s.id !== id) return s

      // Replace current shift with the new one
      return shift
    })
  }),
  on(ShiftsActions.deleteShift, (state, { id }): Shift[] => {
    return state.filter(e => e.id !== id)
  }),
  on(ShiftsActions.updateEmployee, (state, { currentEmployeeId, newEmployee}): Shift[] => {
    return state.map(shift => {
      if (shift.employee.id !== currentEmployeeId) {
        return shift
      }

      return {
        ...shift,
        employee: newEmployee
      }
    })
  }),
  on(ShiftsActions.deleteShiftsByEmployee, (state, { id }): Shift[] => {
    return state.filter(shift => shift.employee.id !== id)
  }),
  on(ShiftsActions.deleteShiftsByEmployee, (state, { id }): Shift[] => {
    return state.filter(shift => shift.employee.id !== id)
  }),
  on(ShiftsActions.updateTemplate, (state, { currentTemplateId, newTemplate}): Shift[] => {
    return state.map(shift => {
      if (shift.template.id !== currentTemplateId) {
        return shift
      }

      return {
        ...shift,
        template: newTemplate
      }
    })
  }),
  on(ShiftsActions.deleteShiftsByTemplate, (state, { id }): Shift[] => {
    return state.filter(shift => shift.template.id !== id)
  })
);
