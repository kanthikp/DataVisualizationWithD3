import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Data Visualization';

  ngOnInit() {

  }
  rangeValueChanged(event, start: any, end: any) {
    var start_el = this.getElement(start);
    var end_el = this.getElement(end);
   // start_el.innerText = event.startValue;
    //end_el.innerText = event.endValue;
  }

  getElement(data) {
    if (typeof (data) == 'string') {
      return document.getElementById(data);
    }
    if (typeof (data) == 'object' && data instanceof Element) {
      return data;
    }
    return null;
  }
}
