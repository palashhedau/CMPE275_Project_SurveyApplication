import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  public colors = ['red', 'green', 'blue']
  public  dataColumns = [1]; // Single Bar Chart
// public  dataColumns = [3]; // Stacked Bar Chart
// public  dataColumns = [2, 1]; // Multi Stacked Bar Chart
  public  barChartData = [{
    id: 0,
    label: 'label1',
    value1: 10,
    value2: 10,
    value3: 10,
  },{
    id: 1,
    label: 'label2',
    value1: 10,
    value2: 10,
    value3: 10,
  }]

  constructor() { }
  ngOnInit() {
      //this.chartdata = true;
  }
}
