import { ShiftService } from './../../services/shift.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ShiftTemplateService } from './../../services/shift-template.service';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnDestroy } from '@angular/core';
import { UnknownEmployee, Employee } from 'src/app/models/employee.model';
import { UnknownTemplate, ShiftTemplate } from 'src/app/models/shift-template.model';
import { Shift } from 'src/app/models/shift.model';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnDestroy {
  closed = new BehaviorSubject<boolean>(false)
  submittedData = new BehaviorSubject<Shift|null>(null)

  employees: ReadonlyArray<Employee> = []
  templates: ReadonlyArray<ShiftTemplate> = []
  subs: Subscription[] = []

  date?: string
  employee?: Employee
  template?: ShiftTemplate

  error = ''
  canCreateShift = true

  constructor(
    employeeService: EmployeeService,
    templateService: ShiftTemplateService,
    private shiftService: ShiftService
  ) {
    this.subs.push(employeeService.employees$.subscribe(employees => {
      this.employees = employees
      this.updateCanCreateShift()
    }))
    this.subs.push(templateService.templates$.subscribe(templates => {
      this.templates = templates
      this.updateCanCreateShift()
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe()
    })
  }

  close () {
    this.closed.next(true)
    this.closed.complete()
  }

  submit () {
    if (this.date) {
      // Create shift
      const shift: Shift = {
        id: new Date().getTime(),
        date: new Date(this.date),
        employee: this.employee || UnknownEmployee,
        template: this.template || UnknownTemplate
      }

      // Validate
      if (this.shiftService.canBeSaved(shift)) {
        this.submittedData.next(shift)
        this.submittedData.complete()
      } else {
        this.error = 'Employee is busy at this time'
      }
    }
  }

  updateCanCreateShift () {
    this.canCreateShift = !!this.templates.length &&
      !!this.employees.length
    this.error = ''

    if (!this.canCreateShift) {
      this.error = 'You need at least one Template and at least one Employee to schedule a shift'
    }
  }
}
