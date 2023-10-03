import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { reducers } from './state/reducers';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot(reducers),
    ],
    declarations: [
      AppComponent,
      NavBarComponent,
      SvgIconComponent
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
