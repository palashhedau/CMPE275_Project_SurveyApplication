import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-single-option-select-image',
  templateUrl: './que-single-option-select-image.component.html',
  styleUrls: ['./que-single-option-select-image.component.css']
})
export class QueSingleOptionSelectImageComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number, id : string}>();
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>();
  @Input('question') question: string;
  @Input('id') id: string;

  constructor() { }
  public moreOptions: string [] = [];


  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  saveChoices(element: NgModel, sequence: number) {
    this.saveChoice.emit({choice: element.value, sequence: sequence + 2, id: this.id});
  }

  addOptions(){
    this.moreOptions.push('');
  }

}
