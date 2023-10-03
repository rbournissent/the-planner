import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShiftTemplate } from '../models/shift-template.model';
import { selectTemplates } from '../state/reducers';
import { ShiftTemplatesActions } from '../state/actions/shift-templates.actions';
import { StoredShiftTemplate } from '../models/stored-shift-template.model';

const mockedTemplate: ShiftTemplate = {
  id: 1,
  name: 'Morning',
  startTime: new Date('2023-10-03 8:30'),
  endTime: new Date('2023-10-03 14:30')
}

@Injectable({
  providedIn: 'root'
})
export class ShiftTemplateService {
  private static STORAGE_KEY = 'templates'
  templates$: Observable<ReadonlyArray<ShiftTemplate>>

  constructor(private store: Store) {
    this.templates$ = this.store.select(selectTemplates)

    // Restore templates
    const templates = localStorage.getItem(ShiftTemplateService.STORAGE_KEY);
    try {
      this.store.dispatch(
        ShiftTemplatesActions.fetchShiftTemplates({
          templates: templates
            ? JSON.parse(templates).map(this.parseStoredTemplate)
            : [mockedTemplate]
        })
      )
    } catch (e) {
      console.error(e);
    }
  }

  private parseStoredTemplate (template: StoredShiftTemplate) {
    return {
      id: template.id,
      name: template.name,
      startTime: new Date(template.startTime),
      endTime: new Date(template.endTime)
    }
  }
}
