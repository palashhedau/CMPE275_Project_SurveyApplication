import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {SurveyService} from '../../survey-service.service';

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

  @Input('questionType') questionType: string;
  public editQuestion = false;
  constructor(private surveyService : SurveyService) { }
  allowEditQuestion(){
    this.editQuestion = true;
  }
  saveQuestion(){
    this.editQuestion = false;
    this.surveyService.saveEditedQuestion(this.question , this.id);
  }


  ngOnInit() {
  }

}
