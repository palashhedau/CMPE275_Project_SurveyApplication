import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';


@Component({
  selector: 'app-que-dropdown-select-text',
  templateUrl: './que-dropdown-select-text.component.html',
  styleUrls: ['./que-dropdown-select-text.component.css']
})
export class QueDropdownSelectTextComponent implements OnInit {
  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number}>()
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
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
     this.saveChoice.emit({choice: element.value, sequence: sequence + 2});
  }

  addOptions(){
    this.moreOptions.push('');
  }
}
