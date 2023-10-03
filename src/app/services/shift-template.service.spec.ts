import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ShiftTemplateService } from './shift-template.service';
import { reducers } from '../state/reducers';

describe('ShiftTemplateService', () => {
  let service: ShiftTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    });
    service = TestBed.inject(ShiftTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
