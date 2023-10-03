import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Employee } from '../models/employee.model';
import { selectEmployees } from '../state/reducers';
import { EmployeesActions } from '../state/actions/employees.actions';

// TEMP
const mockedEmployee: Employee = {
  id: 1,
  name: 'Rodrigo'
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private static STORAGE_KEY = 'employees'
  employees$: Observable<ReadonlyArray<Employee>>

  constructor(private store: Store) {
    this.employees$ = this.store.select(selectEmployees)

    // Restore employees
    const employees = localStorage.getItem(EmployeeService.STORAGE_KEY);
    try {
      const parsedEmployees = employees
        ? JSON.parse(employees)
        : [mockedEmployee]
      this.store.dispatch(
        EmployeesActions.fetchEmployees({ employees: parsedEmployees })
      )

      // Persist data when it gets updated
      this.employees$.subscribe(this.storeEmployees)
    } catch (e) {
      console.error(e);
    }
  }

  create(name: string) {
    const employee: Employee = {
      id: new Date().getTime(),
      name
    }
    this.store.dispatch(
      EmployeesActions.createEmployee({ employee })
    )
  }

  update(id: Employee['id'], name: string) {
    const updatedEmployee: Employee = {
      id,
      name
    }

    this.store.dispatch(EmployeesActions.updateEmployee({
      employee: updatedEmployee
    }))

    return updatedEmployee
  }

  delete(id: Employee['id']) {
    this.store.dispatch(EmployeesActions.deleteEmployee({ id }))
  }

  private storeEmployees (employees: ReadonlyArray<Employee>) {
    localStorage.setItem(
      EmployeeService.STORAGE_KEY,
      JSON.stringify(employees)
    )
  }
}
