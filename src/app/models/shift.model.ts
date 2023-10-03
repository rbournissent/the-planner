import { ShiftTemplate } from './shift-template.model'
import { Employee } from './employee.model';

export interface Shift {
  id: number,
  date: Date,
  template: ShiftTemplate,
  employee: Employee,
}
