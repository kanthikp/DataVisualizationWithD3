import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'select-date-range',
  templateUrl: './select-date-range.component.html',
  styleUrls: ['./select-date-range.component.css']
})
export class SelectDateRangeComponent implements OnInit {
  showLineChart: boolean = true;
  showBubbleChart: boolean = false;
  startDate: Date;
  endDate: Date;
  selectedChart: string ;

  @Output() onDateRangeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChartSelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(private componentFactory: ComponentFactoryResolver) { }

  changeChart() {
    if (this.selectedChart == "lineChart") {
      this.showLineChart = true;
      this.showBubbleChart = false;

    }
    else {
      this.showLineChart = false;
      this.showBubbleChart = true;
    }
     this.onChartSelected.emit({ chartType: this.selectedChart });
     this.validateDate();
  }
  ngOnInit() {
    //   this.startDate = new Date("01-01-2017");
    // this.endDate=new Date("05-05-2017");
  }

  validateDate() {
    if (this.endDate == undefined || this.startDate == undefined || this.selectedChart==undefined)
      return;
    else if (this.endDate < this.startDate) {
      alert("End Date cannot be less than Start Date");
      this.endDate = null;
    }
    else {
      this.onDateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate, chartType: this.selectedChart });
    }

  }

}
