import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {SurveyService} from '../../survey-service.service';


@Component({
  selector: 'app-que-dropdown-select-text',
  templateUrl: './que-dropdown-select-text.component.html',
  styleUrls: ['./que-dropdown-select-text.component.css']
})
export class QueDropdownSelectTextComponent implements OnInit {
  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id: string}>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('question') question: string;
  @Input('id') id: string;

  constructor(private surveyService: SurveyService) { }
  public moreOptions: any = [];


  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(element: NgModel, sequence: number) {
    if(sequence > -1){
      this.moreOptions[sequence][1] =  element.value ;
    }
    this.saveChoice.emit({choice: element.value, sequence: sequence + 2 , id: this.id});
  }

  addOptions(){
    this.moreOptions.push([this.moreOptions.length, '']);
  }

  deleteOptions(index: number){
    this.moreOptions.splice(index,1);
    this.surveyService.deleteChoice(index + 2, this.id);
  }
}
