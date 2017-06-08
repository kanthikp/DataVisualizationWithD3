import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderBubbleChartComponent } from './render-bubble-chart.component';

describe('RenderBubbleChartComponent', () => {
  let component: RenderBubbleChartComponent;
  let fixture: ComponentFixture<RenderBubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderBubbleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderBubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
