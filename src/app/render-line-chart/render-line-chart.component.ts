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

@Component({
  selector: 'render-line-chart',
  templateUrl: './render-line-chart.component.html',
  styleUrls: ['./render-line-chart.component.css']
})
export class RenderLineChartComponent implements OnChanges {
  @Input() startDate: Date;
  @Input() endDate: Date;
  saleDataForCharts: Sale[];
  show: boolean = false;

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private area: d3Shape.Area<[number, number]>;


  constructor(private salesDataSvc: SalesDataService) {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  ngOnChanges() {
    // if (this.startDate != undefined && this.endDate != undefined)
    //   alert("render graph");
  }

  RenderChart(startDate: Date, endDate: Date) {
    if (this.svg) {
      this.show = true;
      d3.selectAll("#lineSVG > *").remove();
    }
    this.startDate = startDate;
    this.endDate = endDate;
    this.saleDataForCharts = this.salesDataSvc.getSalesData(startDate, endDate)
    this.show = true;
    //.then(data => this.saleDataForCharts = data);
    //let myStock = SalesData.filter(s=>s.date>=startDate && s.date<=endDate);
    if (this.saleDataForCharts.length > 0) {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    }

  }

  private initSvg() {
    this.svg = d3.select("#lineSVG")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.saleDataForCharts, (d) => d.date));
    this.y.domain(d3Array.extent(this.saleDataForCharts, (d) => d.value));
  }

  // gridlines in x axis function
  private make_x_gridlines() {
    return d3Axis.axisBottom(this.x)
      .ticks(5)
  }

  // gridlines in y axis function
  private make_y_gridlines() {
    return d3Axis.axisLeft(this.y)
      .ticks(5)
  }

  private drawAxis() {

    // add the X gridlines
    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.make_x_gridlines()
        .tickSize(-this.height)
        .tickFormat(function (d) { return ""; }));

    // add the Y gridlines
    this.svg.append("g")
      .attr("class", "grid")
      .call(this.make_y_gridlines()
        .tickSize(-this.width)
        .tickFormat(function (d) { return ""; }));


    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x).tickFormat(d3TimeFormat.timeFormat("%m/%y")));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y).tickFormat(function (d) { return "$" + d; }))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    let xx = this.x;
    let yy = this.y;

    this.area = d3Shape.area()
      .x(function (d: any) { return xx(d.date); })
      .y0(this.height)
      .y1(function (d: any) { return yy(d.value); });

    this.svg.append("path")
      .datum(this.saleDataForCharts)
      .attr("class", "area")
      .attr("d", this.area);

    this.svg.append("path")
      .datum(this.saleDataForCharts)
      .attr("class", "line")
      .attr("d", this.line);


    this.svg.selectAll(".dot")
      .data(this.saleDataForCharts)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2.5)
      .attr("cx", function (d) { return xx(d.date); })
      .attr("cy", function (d) { return yy(d.value); });
  }


}
