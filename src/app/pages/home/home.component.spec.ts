import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { reducers } from 'src/app/state/reducers';
import { SvgIconComponent } from 'src/app/components/svg-icon/svg-icon.component';
import { ShiftService } from 'src/app/services/shift.service';
import { ShiftFormComponent } from 'src/app/components/shift-form/shift-form.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ShiftService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FullCalendarModule,
        StoreModule.forRoot(reducers),
        FormsModule
      ],
      declarations: [
        HomeComponent,
        ShiftFormComponent,
        SvgIconComponent
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(ShiftService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have events', () => {
    expect(component.events).toBeDefined()
    expect(Array.isArray(component.events.getValue())).toBeTrue()
  })

  it('should unsubscribe from observable on destroy', () => {
    expect(component.shiftsSub).toBeDefined()

    component.shiftsSub = of().subscribe()
    const unsubSpy = spyOn(component.shiftsSub, 'unsubscribe')

    component.ngOnDestroy()

    expect(unsubSpy).toHaveBeenCalled()
  })

  it('should have calendar options', () => {
    expect(component.calendarOptions).toBeDefined()
  })

  it('should start with week view', () => {
    expect(component.calendarOptions.initialView).toBe('timeGridWeek')
  })

  it('should have Monday as the first day of the week', () => {
    // Monday = 1 (Sunday = 0)
    expect(component.calendarOptions.firstDay).toBe(1)
  })

  it('should call removeShift from service if ID is provided', () => {
    const id = '123'
    const removeShiftSpy = spyOn(service, 'removeShift').and.callThrough()

    component.removeShift(id)
    expect(removeShiftSpy).toHaveBeenCalledWith(parseInt(id))
  })

  it('should NOT call removeShift from service if ID is NOT provided', () => {
    const removeShiftSpy = spyOn(service, 'removeShift').and.callThrough()

    component.removeShift()
    expect(removeShiftSpy).not.toHaveBeenCalled()
  })

  describe('Modal', () => {
    it('should have an overlay reference', () => {
      expect(component.overlayRef).toBeDefined()
      expect(component.overlayRef.attach).toBeInstanceOf(Function)
      expect(component.overlayRef.detach).toBeInstanceOf(Function)
    })

    it('should have a method that opens an overlay', () => {
      expect(component.openShiftForm).toBeDefined()

      const attachSpy = spyOn(component.overlayRef, 'attach').and.callThrough()

      component.openShiftForm()

      expect(attachSpy).toHaveBeenCalled()
      expect(document.querySelector('app-shift-form')).not.toBeNull()
    })
  })
});
