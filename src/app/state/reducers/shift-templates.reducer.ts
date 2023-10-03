import { createReducer, on } from '@ngrx/store';
import { ShiftTemplatesActions } from '../actions/shift-templates.actions';
import { ShiftTemplate } from '../../models/shift-template.model';

export const initialState: ReadonlyArray<ShiftTemplate> = [];

export const templatesReducer = createReducer(
  initialState,
  on(ShiftTemplatesActions.fetchShiftTemplates, (_state, { templates }): ShiftTemplate[] => {
    return templates
  }),
  on(ShiftTemplatesActions.createShiftTemplate, (state, { template }): ShiftTemplate[] => {
    return [
      ...state,
      template
    ]
  }),
  on(ShiftTemplatesActions.updateShiftTemplate, (state, { template }): ShiftTemplate[] => {
    return [
      ...state.filter(e => e.id !== template.id),
      template
    ]
  }),
  on(ShiftTemplatesActions.deleteShiftTemplate, (state, { id }): ShiftTemplate[] => {
    return state.filter(e => e.id !== id)
  })
);
