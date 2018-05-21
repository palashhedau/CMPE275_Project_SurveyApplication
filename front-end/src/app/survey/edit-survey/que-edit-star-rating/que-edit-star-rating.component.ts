import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-edit-star-rating',
  templateUrl: './que-edit-star-rating.component.html',
  styleUrls: ['./que-edit-star-rating.component.css']
})
export class QueEditStarRatingComponent implements OnInit {
  @Input('question') question: any;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>();
  @Output('saveRatingsChoice') saveRatingsChoice = new EventEmitter<{choice: string, sequence: string}>()
  @Output('saveEditedQuestion') saveEditedQuestion = new EventEmitter<{ question: string , id: string}>();
  public editQuestion = false;
  public editableQuestion = '';
  @Input('questionType') questionType: string;

  constructor() { }

  ngOnInit() {
    this.editableQuestion = this.question.question;
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  allowEditQuestion(){
    this.editQuestion = true;
  }

  saveQuestion(){
    this.editQuestion = false;
    this.saveEditedQuestion.emit({ question: this.editableQuestion , id : this.id});

  }


}
