import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-edit-multiple-option-select-text',
  templateUrl: './que-edit-multiple-option-select-text.component.html',
  styleUrls: ['./que-edit-multiple-option-select-text.component.css']
})
export class QueEditMultipleOptionSelectTextComponent implements OnInit {

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

  saveChoices( element: NgModel, sequence: number) {
    if(sequence > -1){
      this.optionArray[sequence][1] =  element.value ;
    }
    this.saveChoice.emit({choice: element.value, sequence: sequence , id: this.id});
  }

  addOptions(){
    this.optionArray.push([this.moreOptions.length , '']);
  }

  deleteOptions(index: number){
    console.log("Emittin " + index)
    this.optionArray.splice(index,1);
    this.deleteOptionsEdit.emit({ sequence: index , id: this.id});
  }

}
