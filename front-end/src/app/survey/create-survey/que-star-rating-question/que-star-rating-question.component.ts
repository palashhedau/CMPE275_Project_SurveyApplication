import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-star-rating-question',
  templateUrl: './que-star-rating-question.component.html',
  styleUrls: ['./que-star-rating-question.component.css']
})
export class QueStarRatingQuestionComponent implements OnInit {
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
