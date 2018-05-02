import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-star-rating-question',
  templateUrl: './que-star-rating-question.component.html',
  styleUrls: ['./que-star-rating-question.component.css']
})
export class QueStarRatingQuestionComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Output('saveRatingsChoice') saveRatingsChoice = new EventEmitter<{choice: string, sequence: string}>()

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  constructor() { }

  saveChoices(element: NgModel) {
    console.log("Palash3", element.value);
    this.saveRatingsChoice.emit({choice: element.value , sequence: this.id});
  }

  ngOnInit() {
  }

}
