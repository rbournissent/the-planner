import { createReducer, on } from '@ngrx/store';
import { ShiftTemplatesActions } from '../actions/shift-templates.actions';
import { ShiftTemplate } from '../../models/shift-template.model';

export const initialState: ReadonlyArray<ShiftTemplate> = [];

export const templatesReducer = createReducer(
  initialState,
  on(ShiftTemplatesActions.fetchShiftTemplates, (_state, { templates }): ShiftTemplate[] => {
    return templates
  }),
);
