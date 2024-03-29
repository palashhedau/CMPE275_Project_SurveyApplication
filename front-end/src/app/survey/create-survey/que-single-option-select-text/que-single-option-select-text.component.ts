import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-que-single-option-select-text',
  templateUrl: './que-single-option-select-text.component.html',
  styleUrls: ['./que-single-option-select-text.component.css']
})
export class QueSingleOptionSelectTextComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string}>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: string;
  @Input('id') id: string;
  public unique: boolean;
  public errorMessage = '';

  constructor(private surveyService: SurveyService) { }
  public moreOptions: any = [];
  @Input('questionType') questionType: string;
  public editQuestion = false;
  allowEditQuestion(){
    this.editQuestion = true;
  }
  saveQuestion(){
    this.editQuestion = false;
    this.surveyService.saveEditedQuestion(this.question , this.id);
  }


  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(element: NgModel, sequence: number) {
    this.unique = this.surveyService.addChoice(element.value, sequence + 2 , this.id);
    if(sequence > -1 && this.unique === true){
      this.moreOptions[sequence][1] =  element.value ;
      this.errorMessage = '';
      this.unique = true;
    }
    if(this.unique === false){
      this.errorMessage = 'Please enter unique options';

    }
  }

  addOptions(){
    if(this.unique === true){
      this.errorMessage = '';
      this.moreOptions.push([this.moreOptions.length, '']);
    }else{
      this.errorMessage = 'Please enter unique options before adding new';
    }

  }

  deleteOptions(index: number){
    this.moreOptions.splice(index,1);
    this.unique = true ;
    this.surveyService.deleteChoice(index + 2, this.id);
  }

}
