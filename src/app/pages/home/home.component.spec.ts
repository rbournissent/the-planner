import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StoreModule } from '@ngrx/store';

import { HomeComponent } from './home.component';
import { reducers } from 'src/app/state/reducers';
import { SvgIconComponent } from 'src/app/components/svg-icon/svg-icon.component';
import { EventComponent } from 'src/app/components/event/event.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FullCalendarModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        HomeComponent,
        SvgIconComponent,
        EventComponent
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
