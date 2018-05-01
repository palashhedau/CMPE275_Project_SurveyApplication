import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-que-short-answer',
  templateUrl: './que-short-answer.component.html',
  styleUrls: ['./que-short-answer.component.css']
})
export class QueShortAnswerComponent implements OnInit {
  @Input('question') question: string;
  constructor() { }

  ngOnInit() {
  }

}
