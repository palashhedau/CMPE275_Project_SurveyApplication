import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-que-edit-dropdown-select-text',
  templateUrl: './que-edit-dropdown-select-text.component.html',
  styleUrls: ['./que-edit-dropdown-select-text.component.css']
})
export class QueEditDropdownSelectTextComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string}>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: any;
  @Input('id') id: string;
  @Output('deleteOptions') deleteOptionsEdit = new EventEmitter<{ sequence: number, id: string}>()
  @Output('saveEditedQuestion') saveEditedQuestion = new EventEmitter<{ question: string , id: string}>();
  public editQuestion = false;
  public editableQuestion = '';
  @Input('questionType') questionType: string;
  /*public unique: boolean;
  public errorMessage = '';*/

  public errorMessage = '';
  public unique = true ;

  public optionArray = [];

  constructor(private surveyService: SurveyService) { }
  public moreOptions: any = [];


  ngOnInit() {
    for(const option of this.question.choice){
      this.optionArray.push([this.moreOptions.length , option.answers]);
    }
    this.editableQuestion = this.question.question;
  }

  allowEditQuestion(){
    this.editQuestion = true;
  }

  saveQuestion(){
    this.editQuestion = false;
    this.saveEditedQuestion.emit({ question: this.editableQuestion , id : this.id});

  }


  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices( element: NgModel,  sequence: number) {
    this.errorMessage = '';
    this.unique = true

    let count = 0 ;
    // check in options array if such option exist
    for(const options of this.optionArray){
      if(options[1] === element.value){
        count ++ ;
      }
    }

    if(count === 1){
      this.optionArray[sequence][1] =  element.value ;
      this.saveChoice.emit({choice: element.value, sequence: sequence , id: this.id});
    }else{
      this.errorMessage = 'Option already present';
      this.unique = false;
    }
  }

  addOptions(){
    if(this.unique === false){
      this.errorMessage = 'Before adding new options, check and correct previou ones';
      return;
    }
    this.optionArray.push([this.moreOptions.length , '']);
  }

  deleteOptions(index: number){
    this.optionArray.splice(index,1);
    this.deleteOptionsEdit.emit({ sequence: index , id: this.id});
  }

}
