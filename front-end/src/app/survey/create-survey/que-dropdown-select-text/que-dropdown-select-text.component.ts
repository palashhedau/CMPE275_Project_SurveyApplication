import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-dropdown-select-text',
  templateUrl: './que-dropdown-select-text.component.html',
  styleUrls: ['./que-dropdown-select-text.component.css']
})
export class QueDropdownSelectTextComponent implements OnInit {
  @Output('saveChoice') saveChoice = new EventEmitter<{choice: string, sequence: number}>()

  constructor() { }

  ngOnInit() {
  }

  saveChoices(element: NgModel, sequence: number) {
     this.saveChoice.emit({choice: element.value, sequence: sequence + 2});
  }

}
