import { Injectable } from '@angular/core';
import { Sale, SalesData } from './../shared/sales-data';
@Injectable()
export class SalesDataService {
  private salesData: Sale[];
  constructor() {
    this.salesData = SalesData;
  }

  getSalesData(startDate: Date, endDate: Date): Sale[] {
    let sd: Date = new Date(startDate);
    let ed: Date = new Date(endDate);
    return this.salesData.filter(s => (s.date.getTime() > sd.getTime() && s.date.getTime() < ed.getTime()));
    // return this.salesData;
  }
  getDataRange(): Date[] {
    return this.salesData.map(s => s.date);
    // return null;
  }
  getValueforDate(d: Date): number {
    if(d==undefined)
    return 0;
     let dt: Date = new Date(d);
    let sales = this.salesData.filter(s => s.date.getTime() == dt.getTime());
    if (sales.length > 0)
      return sales[0].value;
    else {
      sales = this.salesData.filter(s => s.date.getTime() > dt.getTime());
      if (sales.length > 0)
        return sales[0].value;
      else
        return 0;
    }
  }
}
