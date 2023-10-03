import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { ShiftFormComponent } from './shift-form.component';
import { reducers } from 'src/app/state/reducers';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

describe('ShiftFormComponent', () => {
  let component: ShiftFormComponent;
  let fixture: ComponentFixture<ShiftFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule,
      ],
      declarations: [
        ShiftFormComponent,
        SvgIconComponent,
      ]
    });
    fixture = TestBed.createComponent(ShiftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
