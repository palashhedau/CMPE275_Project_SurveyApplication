import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chartdemo',
  templateUrl: './chartdemo.component.html',
  styleUrls: ['./chartdemo.component.css']
})
export class ChartdemoComponent {

  data: any;

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [63, 58, 82, 81, 56, 55, 41]
        },
        {
          label: '',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [27, 49, 45, 19, 87, 28, 90]
        }
      ]
    }
  }

}
