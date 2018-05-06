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


  public optionArray = [];

  constructor(private surveyService: SurveyService) { }
  public moreOptions: any = [];


  ngOnInit() {
    for(const option of this.question.choice){
      this.optionArray.push([this.moreOptions.length , option.answers]);
    }

  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices( element: NgModel,  sequence: number) {
    if(sequence > -1){
    this.optionArray[sequence][1] =  element.value ;
  }
  this.saveChoice.emit({choice: element.value, sequence: sequence , id: this.id});
  }

  addOptions(){
    this.optionArray.push([this.moreOptions.length , '']);
  }

  deleteOptions(index: number){
    this.optionArray.splice(index,1);
    this.deleteOptionsEdit.emit({ sequence: index , id: this.id});
  }

}
