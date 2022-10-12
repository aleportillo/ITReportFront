import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReportsComponent } from './active-reports.component';

describe('ActiveReportsComponent', () => {
  let component: ActiveReportsComponent;
  let fixture: ComponentFixture<ActiveReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
