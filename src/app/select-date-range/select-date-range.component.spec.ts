import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDataRangeComponent } from './select-data-range.component';

describe('SelectDataRangeComponent', () => {
  let component: SelectDataRangeComponent;
  let fixture: ComponentFixture<SelectDataRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDataRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDataRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
