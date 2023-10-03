import { createActionGroup, props } from '@ngrx/store'
import { ShiftTemplate } from '../../models/shift-template.model'

export const ShiftTemplatesActions = createActionGroup({
  source: 'ShiftTemplates',
  events: {
    'Fetch ShiftTemplates': props<{ templates: ShiftTemplate[] }>(),
    'Create ShiftTemplate': props<{ template: ShiftTemplate }>(),
    'Update ShiftTemplate': props<{ template: ShiftTemplate }>(),
    'Delete ShiftTemplate': props<{ id: ShiftTemplate['id'] }>()
  }
})
