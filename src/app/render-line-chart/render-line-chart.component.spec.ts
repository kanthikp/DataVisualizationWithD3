import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderLineChartComponent } from './render-line-chart.component';

describe('RenderLineChartComponent', () => {
  let component: RenderLineChartComponent;
  let fixture: ComponentFixture<RenderLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
