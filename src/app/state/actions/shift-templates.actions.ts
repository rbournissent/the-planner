import { createActionGroup, props } from '@ngrx/store'
import { ShiftTemplate } from '../../models/shift-template.model'

export const ShiftTemplatesActions = createActionGroup({
  source: 'ShiftTemplates',
  events: {
    'Fetch ShiftTemplates': props<{ templates: ShiftTemplate[] }>(),
  }
})
