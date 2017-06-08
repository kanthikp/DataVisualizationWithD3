import { Component, OnInit, ViewChild } from '@angular/core';
import { RenderLineChartComponent } from './../render-line-chart/render-line-chart.component';
import { RenderBubbleChartComponent } from './../render-bubble-chart/render-bubble-chart.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'visualize-data',
  templateUrl: './visualize-data.component.html',
  styleUrls: ['./visualize-data.component.css']
})
export class VisualizeDataComponent {

  startDate: Date;
  endDate: Date;
  @ViewChild(RenderLineChartComponent) lineChartComponent: RenderLineChartComponent;
  @ViewChild(RenderBubbleChartComponent) bubbleChartComponent: RenderBubbleChartComponent;

  showLineChart: boolean = false;
  showBubbleChart: boolean = false;


  onDateRangeSelected(input: any) {

    if (input.chartType == "lineChart") {
      this.showLineChart = true;
      this.showBubbleChart = false;
      this.lineChartComponent.RenderChart(input.startDate, input.endDate);
    }
    else {
      this.showLineChart = false;
      this.showBubbleChart = true;
      this.bubbleChartComponent.RenderChart(input.startDate, input.endDate);
    }
  }

   onChartSelected(input: any) {

    if (input.chartType == "lineChart") {
      this.showLineChart = true;
      this.showBubbleChart = false;
    }
    else {
      this.showLineChart = false;
      this.showBubbleChart = true;
    }
  }




}
