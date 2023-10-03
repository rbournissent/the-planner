import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { ShiftTemplate, ShiftTemplateData, ShiftTemplateEdit } from 'src/app/models/shift-template.model';
import { ShiftTemplateService } from 'src/app/services/shift-template.service';
import { ShiftService } from 'src/app/services/shift.service';
import { timeToDate } from 'src/app/utils/timeToDate';

const emptyTemplateData: ShiftTemplateEdit = {
  name: '',
  startTime: '',
  endTime: ''
}

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  providers: [DatePipe]
})
export class TemplatesComponent {
  templates: Observable<ReadonlyArray<ShiftTemplate>>
  newTemplate: ShiftTemplateEdit = {
    ...emptyTemplateData
  }
  editingTemplateId?: ShiftTemplate['id']
  editingTemplate: ShiftTemplateEdit = {
    ...emptyTemplateData
  }

  constructor(
    private templateService: ShiftTemplateService,
    private shiftService: ShiftService,
    private datePipe: DatePipe
  ) {
    this.templates = templateService.templates$
  }

  add () {
    this.templateService.create(
      this.templateEditToData(this.newTemplate)
    )
    this.newTemplate = { ...emptyTemplateData }
  }

  edit (template: ShiftTemplate) {
    if (!this.editingTemplateId) {
      // Start edit
      this.editingTemplateId = template.id
      this.editingTemplate = {
        name: template.name,
        startTime: this.datePipe.transform(
          template.startTime,
          'HH:mm'
        ) || '00:00',
        endTime: this.datePipe.transform(
          template.endTime,
          'HH:mm'
        ) || '00:00'
      }
    } else {
      // Submit edit
      const updatedTemplate = this.templateService.update(
        template.id,
        this.templateEditToData(this.editingTemplate)
      )
      this.shiftService.updateTemplate(template.id, updatedTemplate)
      this.resetEdit()
    }
  }

  templateEditToData (edit: ShiftTemplateEdit): ShiftTemplateData {
    return {
      name: edit.name,
      startTime: timeToDate(edit.startTime),
      endTime: timeToDate(edit.endTime)
    }
  }

  resetEdit () {
    this.editingTemplateId = undefined
    this.editingTemplate = {
      ...emptyTemplateData
    }
  }

  delete (id: ShiftTemplate['id']) {
    const hasShifts = this.shiftService.templateHasShifts(id)

    if (!hasShifts ||
      confirm('The shifts scheduled with this template will be deleted too. Proceed?')) {
      this.templateService.delete(id)
      this.shiftService.removeByTemplate(id)
    }
  }
}
