import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-que-yes-no',
  templateUrl: './que-yes-no.component.html',
  styleUrls: ['./que-yes-no.component.css']
})
export class QueYesNoComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()

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
