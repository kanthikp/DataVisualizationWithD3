import { Component, OnChanges, OnInit, Input, OnDestroy } from '@angular/core';
import { Sale, SalesData } from './../shared/sales-data';
import { SalesDataService } from './../services/sales-data.service'

import * as D3 from 'd3/index';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3TimeFormat from "d3-time-format";
import * as d3Format from "d3-format";
import * as d3Hierarchy from "d3-hierarchy";
import * as d3Color from "d3-color";



@Component({
  selector: 'render-bubble-chart',
  templateUrl: './render-bubble-chart.component.html',
  styleUrls: ['./render-bubble-chart.component.css']
})
export class RenderBubbleChartComponent {
  @Input() startDate: Date;
  @Input() endDate: Date;
  saleDataForCharts: Sale[];
  show: boolean = false;
  startValue: number;
  endValue: number;

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;

  private svg: any;
  private r: number;
  private cw: number;
  private ch: number;

  constructor(private salesDataService: SalesDataService) { }

  RenderChart(startDate: Date, endDate: Date) {
    if (this.svg) {
      this.show = true;
      d3.selectAll("#bubbleSVG > *").remove();
    }
    this.startDate = startDate;
    this.endDate = endDate;

    this.startValue = this.salesDataService.getValueforDate(this.startDate);
    this.endValue = this.salesDataService.getValueforDate(this.endDate);
    // this.startValue = 200;
    // this.endValue = 150;
    this.initSVG();
    this.drawBackground();
    this.drawGridLineX();
    this.drawCircle();
    this.drawGridLineY();
  }

  initSVG() {
    this.svg = d3.select("#bubbleSVG"),
      this.width = +this.svg.attr("width"),
      this.height = +this.svg.attr("height");
    this.r = 75;
    this.cw = 600;
    this.ch = 150;
  }
  drawBackground() {
    //  this.svg.append("line")
    // .attr("x1",5)
    // .attr("y1",5)
    // .attr("x2",10)
    // .attr("y2",10)
    // .attr("class","solid");


    this.svg.append("rect")
      .attr("width", this.cw)
      .attr("height", this.ch)
      .style("fill", "lightgray");


  }
  drawGridLineY() {
    this.svg
      .append("line")
      .attr("x1", this.cw / 2)
      .attr("y1", 0)
      .attr("x2", this.cw / 2)
      .attr("y2", this.ch)
      .attr("stroke-width", .5)
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "darkgray");
  }
  drawGridLineX() {
    this.svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", this.ch / 2)
      .attr("x2", this.cw)
      .attr("y2", this.ch / 2)
      .attr("stroke-width", .5)
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "gray");
  }
  drawCircle() {
let percentChange:string;
    if (this.startValue > this.endValue) {

      percentChange = Math.round(((this.startValue - this.endValue)/this.startValue)*100).toFixed(2);

      this.svg.append("circle")
        .attr("r", this.r)
        .attr("cx", this.cw / 2)
        .attr("cy", this.ch / 2)
        .style("fill", "gray");

      this.svg.append("rect")
        .attr("x", (this.cw / 2) - 100)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", this.ch)
        .style("fill", "gray");

      this.svg.append("circle")
        .attr("r", this.r)
        .attr("cx", (this.cw / 2) - 100)
        .attr("cy", this.ch / 2)
        .style("fill", "salmon");

      this.svg
        .append("text")
        .text(percentChange+"%")
        .attr("x",(this.cw / 2) - 100)
        .attr("y",this.ch / 2)
        .attr("class", "circleLabel");


    }
    else {
       percentChange = Math.round(((this.endValue - this.startValue)/this.endValue)*100 ).toFixed(2);
      this.svg.append("circle")
        .attr("r", this.r)
        .attr("cx", this.cw / 2)
        .attr("cy", this.ch / 2)
        .style("fill", "gray");

      this.svg.append("rect")
        .attr("x", this.cw / 2)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", this.ch)
        .style("fill", "gray");


      let grp = this.svg.append("g");
      grp.append("circle")
        .attr("r", this.r)
        .attr("cx", (this.cw / 2) + 100)
        .attr("cy", this.ch / 2)
        .style("fill", "aquamarine");
           
      let label = grp
        .append("text")
        .text(percentChange+"%")
        .attr("x",(this.cw / 2) + 100)
        .attr("y",this.ch / 2)
        .attr("class", "circleLabel");

    }

  }

}
