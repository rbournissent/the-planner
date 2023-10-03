import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EventInput } from '@fullcalendar/core';

import { Shift } from '../models/shift.model';
import { Employee, UnknownEmployee } from '../models/employee.model';
import { ShiftTemplate, UnknownTemplate } from '../models/shift-template.model';
import { EmployeeService } from './employee.service';
import { ShiftTemplateService } from './shift-template.service';
import { ShiftsActions } from '../state/actions/shifts.actions';
import { StoredShift } from '../models/stored-shift.model';
import { selectShifts } from '../state/reducers';
import { isSameDay } from '../utils/isSameDay';
import { rangeConflict } from '../utils/rangeConflict';

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

      this.shifts$.subscribe((shifts) => {
        this.shifts = shifts
        // Persist data when it gets updated
        this.storeShifts(shifts)
      })
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

  saveShift (shift: Shift) {
    this.store.dispatch(
      ShiftsActions.createShift({
        shift
      })
    )
  }

  editShift (id: number, shift: Shift) {
    this.store.dispatch(
      ShiftsActions.updateShift({
        id,
        shift
      })
    )
  }

  removeShift (id: number) {
    this.store.dispatch(
      ShiftsActions.deleteShift({ id })
    )
  }

  shiftAsEventInput(shift: Shift): EventInput {
    // Set start and end dates with times from template
    const { startTime, endTime } = shift.template
    const start = new Date(shift.date)
      .setHours(startTime.getHours(), startTime.getMinutes(), 0)
    const end = new Date (shift.date)
      .setHours(endTime.getHours(), endTime.getMinutes(), 0)

    return {
      id: shift.id.toString(),
      title: `${shift.employee.name} | ${shift.template.name}`,
      template: shift.template,
      employee: shift.employee,
      start,
      end
    }
  }

  canBeSaved (shift: Shift): boolean {
    return !this.shifts.some(s => {
      // Find a shift at the same time range
      return isSameDay(shift.date, s.date) &&
        shift.employee.id === s.employee.id &&
        (shift.template.id === s.template.id ||
          rangeConflict(shift.template, s.template))
    })
  }

  employeeHasShifts (employeeId: Employee['id']): boolean {
    return this.shifts.some(s => {
      return s.employee.id === employeeId
    })
  }

  private storeShifts (shifts: ReadonlyArray<Shift>) {
    const unparsedShifts: StoredShift[] = shifts
      .map(shift => ({
        id: shift.id,
        date: shift.date + '',
        employeeId: shift.employee.id,
        templateId: shift.template.id
      }))

    localStorage.setItem(
      ShiftService.STORAGE_KEY,
      JSON.stringify(unparsedShifts)
    )
  }
}
