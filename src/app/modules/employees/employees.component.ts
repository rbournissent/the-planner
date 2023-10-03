import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees: Observable<ReadonlyArray<Employee>>
  newEmployee = ''

  constructor(
    private employeeService: EmployeeService,
    private shiftService: ShiftService
  ) {
    this.employees = employeeService.employees$
  }

  add () {
    this.employeeService.create(this.newEmployee)
    this.newEmployee = ''
  }

  edit (employee: Employee) {
    const newName = prompt('Name:', employee.name)
    if (newName) {
      const updatedEmployee = this.employeeService.update(employee.id, newName)
      this.shiftService.updateEmployee(employee.id, updatedEmployee)
    }
  }

  delete (id: Employee['id']) {
    const hasShifts = this.shiftService.employeeHasShifts(id)

    if (!hasShifts ||
      confirm('The shifts scheduled for this employee will be deleted too. Proceed?')) {
      this.employeeService.delete(id)
      this.shiftService.removeByEmployee(id)
    }
  }
}
