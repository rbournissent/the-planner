import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ShiftService } from './shift.service';
import { reducers } from '../state/reducers';

describe('ShiftService', () => {
  let service: ShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    });
    service = TestBed.inject(ShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
