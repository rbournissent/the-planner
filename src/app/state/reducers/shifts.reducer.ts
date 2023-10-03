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
);
