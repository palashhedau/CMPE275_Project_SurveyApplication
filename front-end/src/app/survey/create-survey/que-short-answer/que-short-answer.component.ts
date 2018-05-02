import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-short-answer',
  templateUrl: './que-short-answer.component.html',
  styleUrls: ['./que-short-answer.component.css']
})
export class QueShortAnswerComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  constructor() { }

  ngOnInit() {
  }

}
