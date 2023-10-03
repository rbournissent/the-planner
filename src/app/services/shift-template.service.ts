import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShiftTemplate, ShiftTemplateData } from '../models/shift-template.model';
import { selectTemplates } from '../state/reducers';
import { ShiftTemplatesActions } from '../state/actions/shift-templates.actions';
import { StoredShiftTemplate } from '../models/stored-shift-template.model';

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
            : []
        })
      )

      // Persist data when it gets updated
      this.templates$.subscribe(this.storeTemplates)
    } catch (e) {
      console.error(e);
    }
  }

  create(data: ShiftTemplateData) {
    this.store.dispatch(
      ShiftTemplatesActions.createShiftTemplate({
        template: {
          id: new Date().getTime(),
          ...data
        }
      })
    )
  }

  update(id: ShiftTemplate['id'], data: ShiftTemplateData): ShiftTemplate {
    const updatedTemplate = {
      id,
      ...data
    }

    this.store.dispatch(
      ShiftTemplatesActions.updateShiftTemplate({
        template: updatedTemplate
      })
    )
    return updatedTemplate
  }

  delete(id: ShiftTemplate['id']) {
    this.store.dispatch(
      ShiftTemplatesActions.deleteShiftTemplate({ id })
    )
  }

  private parseStoredTemplate (template: StoredShiftTemplate) {
    return {
      id: template.id,
      name: template.name,
      startTime: new Date(template.startTime),
      endTime: new Date(template.endTime)
    }
  }

  private storeTemplates (templates: ReadonlyArray<ShiftTemplate>) {
    localStorage.setItem(
      ShiftTemplateService.STORAGE_KEY,
      JSON.stringify(templates)
    )
  }
}
