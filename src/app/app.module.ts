import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { SelectDateRangeComponent } from './select-date-range/select-date-range.component';
import { RenderLineChartComponent } from './render-line-chart/render-line-chart.component';
import { DateRangeSliderComponent } from './date-range-slider/date-range-slider.component'
import { VisualizeDataComponent } from './visualize-data/visualize-data.component';

import { SalesDataService } from './services/sales-data.service';
import { RenderBubbleChartComponent } from './render-bubble-chart/render-bubble-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    SelectDateRangeComponent,
    RenderLineChartComponent,
    VisualizeDataComponent,
    DateRangeSliderComponent,
    RenderBubbleChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'dataviz',
        component: VisualizeDataComponent
      }
    ])
  ],
  // exports: [Ng2SliderComponent,
  //   Ng2StyledDirective],
  providers: [SalesDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
