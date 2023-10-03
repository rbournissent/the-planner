import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Shift } from '../models/shift.model';
import { Employee, UnknownEmployee } from '../models/employee.model';
import { ShiftTemplate, UnknownTemplate } from '../models/shift-template.model';
import { EmployeeService } from './employee.service';
import { ShiftTemplateService } from './shift-template.service';
import { ShiftsActions } from '../state/actions/shifts.actions';
import { StoredShift } from '../models/stored-shift.model';
import { selectShifts } from '../state/reducers';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private static STORAGE_KEY = 'shifts'
  shifts$: Observable<ReadonlyArray<Shift>>
  shifts: ReadonlyArray<Shift> = []
  private employees: ReadonlyArray<Employee> = []
  private templates: ReadonlyArray<ShiftTemplate> = []

  constructor(
    private store: Store,
    employeeService: EmployeeService,
    templateService: ShiftTemplateService
  ) {
    // Subscribe to get employees and templates
    employeeService.employees$.subscribe(employees => {
      this.employees = employees
    })
    templateService.templates$.subscribe(templates => {
      this.templates = templates
    })

    this.shifts$ = this.store.select(selectShifts)
    // Restore shifts
    const shifts = localStorage.getItem(ShiftService.STORAGE_KEY);
    try {
      this.store.dispatch(
        ShiftsActions.fetchShifts({
          shifts: shifts
            ? this.parseShifts(JSON.parse(shifts))
            : []
        })
      )
    } catch (e) {
      console.error(e);
    }
  }

  parseShifts(storedShifts: StoredShift[]): Shift[] {
    return storedShifts.map(storedShift => {
      const employee = this.employees
        .find(e => e.id === storedShift.employeeId) ||
        UnknownEmployee
      const template = this.templates
        .find(t => t.id === storedShift.templateId) ||
        UnknownTemplate
      return {
        id: storedShift.id,
        date: new Date(storedShift.date),
        employee,
        template
      }
    })
  }

  removeShift (id: number) {
    this.store.dispatch(
      ShiftsActions.deleteShift({ id })
    )
  }
}
