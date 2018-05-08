import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-multiple-option-image',
  templateUrl: './multiple-option-image.component.html',
  styleUrls: ['./multiple-option-image.component.css']
})
export class MultipleOptionImageComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('options') option: NgModel;

  public selectedOptions : [];

  public choices: string [] = [];
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;
    this.selectedOptions = this.question.surveySubmitResponseAnswers;
  }

  getValue(choice : any){
    this.surveyService.setChoice(this.question.id , choice['answers'], this.question.questionType);
  }

  checkIfChecked(option: String) {
    for (const answers of this.selectedOptions) {
      if (answers['answer'] === option) {
        return true;
      }
    }
    return false;
  }

}
