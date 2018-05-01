import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-single-option-select-text',
  templateUrl: './que-single-option-select-text.component.html',
  styleUrls: ['./que-single-option-select-text.component.css']
})
export class QueSingleOptionSelectTextComponent implements OnInit {

  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number}>();
  @Input('question') question: string;
  constructor() { }
  public moreOptions: string [] = [];


  ngOnInit() {
  }


  saveChoices(element: NgModel, sequence: number) {
    this.saveChoice.emit({choice: element.value, sequence: sequence + 2});
  }

  addOptions(){
    this.moreOptions.push('');
  }

}
