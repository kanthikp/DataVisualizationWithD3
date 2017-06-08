import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3TimeFormat from "d3-time-format";
import * as d3Time from "d3-time";
import * as d3Brush from "d3-brush";
import * as d3Drag from "d3-drag";
import * as d3Color from "d3-color";
import * as d3Zoom from "d3-zoom";
import * as d3Request from "d3-request";
import * as bootslider from "bootstrap-slider";

import { SalesData, Sale } from './../shared/sales-data';
import { SalesDataService } from './../services/sales-data.service'

@Component({
  selector: 'date-range-slider',
  templateUrl: './date-range-slider.component.html',
  styleUrls: ['./date-range-slider.component.css']
})
export class DateRangeSliderComponent implements OnInit {

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private margin2 = { top: 430, right: 20, bottom: 30, left: 40 };
  private width: number;
  private height: number;
  private height2: number;
  private x: any;
  private y: any;
  private x2: any;
  private y2: any;
  private svg: any;
  private slider: any;
  private line: d3Shape.Line<[number, number]>;
  private context: any;
  private brush: any;
  private parseDate: any;
  private xAxis: any;
  private xAxis2: any;
  private yAxis: any;
  private zoom: any;
  private handle: any;
  private focus: any;
  private area: d3Shape.Area<[number, number]>;
  private area2: d3Shape.Area<[number, number]>;
  private brushed: any;
  private zoomed: any;

  dateRange: Date[];
  saleDataForCharts: Sale[];

  constructor(private salesDataService: SalesDataService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

  }

  ngOnInit() {
    this.saleDataForCharts = this.salesDataService.getSalesData(new Date("01-01-2015"), new Date("01-01-2017"))
    this.initSvg();
    this.initAxis();
    //this.drawAxis();
  }

  initSvg() {
    this.svg = d3.select("svg"),
      this.width = +this.svg.attr("width") - this.margin.left - this.margin.right,
      this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom,
      this.height2 = +this.svg.attr("height") - this.margin2.top - this.margin2.bottom;
  }

  initAxis() {
    this.parseDate = d3TimeFormat.timeParse("%b %Y");

    // this.x = d3Scale.scaleTime().range([0, this.width]),
      this.x2 = d3Scale.scaleTime().range([0, this.width]),
      // this.y = d3Scale.scaleLinear().range([this.height, 0]),
      this.y2 = d3Scale.scaleLinear().range([this.height2, 0]);

    // this.xAxis = d3Axis.axisBottom(this.x),
      this.xAxis2 = d3Axis.axisBottom(this.x2),
      // this.yAxis = d3Axis.axisLeft(this.y);

    this.brush = d3Brush.brushX()
      .extent([[0, 0], [this.width, this.height2]])
      .on("brush end", this.brushed);

    this.zoom = d3Zoom.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on("zoom", this.zoomed);
    let xx = this.x;
    let yy = this.y;
    let xx2 = this.x2;
    let yy2 = this.y2;
    // this.area = d3Shape.area()
    //   .curve(d3Shape.curveMonotoneX)
    //   .x(function (d: any) { return xx(d.date); })
    //   .y0(this.height)
    //   .y1(function (d: any) { return yy(d.value); });

    this.area2 = d3Shape.area()
      .curve(d3Shape.curveMonotoneX)
      .x(function (d: any) { return xx2(d.date); })
      .y0(this.height2)
      .y1(function (d: any) { return yy2(d.price); });

    this.svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height);

    this.focus = this.svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.context = this.svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + this.margin2.left + "," + this.margin2.top + ")");

    this.processData(this.saleDataForCharts);
    this.brushed = function () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      let s = d3.event.selection || this.x2.range();
      this.x.domain(s.map(this.x2.invert, this.x2));
      this.focus.select(".area").attr("d", this.area);
      this.focus.select(".axis--x").call(this.xAxis);
      this.svg.select(".zoom").call(this.zoom.transform, d3Zoom.zoomIdentity
        .scale(this.width / (s[1] - s[0]))
        .translate(-s[0], 0));
    };

    this.zoomed = function () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
      let t = d3.event.transform;
      this.x.domain(t.rescaleX(this.x2).domain());
      this.focus.select(".area").attr("d", this.area);
      this.focus.select(".axis--x").call(this.xAxis);
      this.context.select(".brush").call(this.brush.move, this.x.range().map(t.invertX, t));
    };
  }

  processData(data: Sale[]) {
    //this.x.domain(d3Array.extent(data, function (d) { return d.date; }));
    //this.y.domain([0, d3Array.max(data, function (d) { return d.value; })]);
    this.x2.domain(d3Array.extent(data, function (d) { return d.date; }));
    this.y2.domain([0, d3Array.max(data, function (d) { return d.value; })]);

    this.focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", this.area);

    // this.focus.append("g")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(this.xAxis);

    // this.focus.append("g")
    //   .attr("class", "axis axis--y")
    //   .call(this.yAxis);

    // this.context.append("path")
    //   .datum(data)
    //   .attr("class", "area")
    //   .attr("d", this.area2);

    this.context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height2 + ")")
      .call(this.xAxis2);

    this.context.append("g")
      .attr("class", "brush")
      .call(this.brush)
      .call(this.brush.move, this.x2.range());

    this.svg.append("rect")
      .attr("class", "zoom")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .call(this.zoom);
  }

}



  // private type(d) {
  //   d.date = this.parseDate(d.date);
  //   d.price = +d.price;
  //   return d;
  // }



