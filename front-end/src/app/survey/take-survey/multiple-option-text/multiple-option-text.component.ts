import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-multiple-option-text',
  templateUrl: './multiple-option-text.component.html',
  styleUrls: ['./multiple-option-text.component.css']
})
export class MultipleOptionTextComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @ViewChild('options') option: NgModel;
  @Input() email: string;
  public selectedOptions =  [];

  public choices: string [] = [];
  constructor(private surveyService : SurveyService) { }

  ngOnInit() {
    this.choices = this.question.choice;

    this.selectedOptions = this.question.surveySubmitResponseAnswers;
    console.log(this.question)
  }

  getValue(choice : any){
    this.surveyService.setChoice(this.question.id ,choice['answers'], this.question.questionType, this.email);
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
