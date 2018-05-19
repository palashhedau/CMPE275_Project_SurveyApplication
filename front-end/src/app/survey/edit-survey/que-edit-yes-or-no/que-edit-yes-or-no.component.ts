import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-edit-yes-or-no',
  templateUrl: './que-edit-yes-or-no.component.html',
  styleUrls: ['./que-edit-yes-or-no.component.css']
})
export class QueEditYesOrNoComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>();
  @Output('saveEditedQuestion') saveEditedQuestion = new EventEmitter<{ question: string , id: string}>();
  public editQuestion = false;
  public editableQuestion = '';
  @Input('questionType') questionType: string;
  constructor() { }

  ngOnInit() {
    this.editableQuestion = this.question;
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }
  allowEditQuestion(){
    this.editQuestion = true;
  }

  saveQuestion(){
    this.editQuestion = false;
    this.saveEditedQuestion.emit({ question: this.editableQuestion , id : this.id});

  }

}
