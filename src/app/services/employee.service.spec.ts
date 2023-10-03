import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { EmployeeService } from './employee.service';
import { reducers } from '../state/reducers';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
