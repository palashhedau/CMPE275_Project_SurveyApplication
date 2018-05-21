import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-que-short-answer',
  templateUrl: './que-short-answer.component.html',
  styleUrls: ['./que-short-answer.component.css']
})
export class QueShortAnswerComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()

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


  deleteQuestion(){
    this.delete.emit({id : this.id});
  }



  ngOnInit() {
  }

}
