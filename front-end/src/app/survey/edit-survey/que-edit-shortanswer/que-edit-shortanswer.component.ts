import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-edit-shortanswer',
  templateUrl: './que-edit-shortanswer.component.html',
  styleUrls: ['./que-edit-shortanswer.component.css']
})
export class QueEditShortanswerComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>();
  @Output('saveEditedQuestion') saveEditedQuestion = new EventEmitter<{ question: string , id: string}>();
  @Input('questionType') questionType: string;

  public editQuestion = false;
  public editableQuestion = '';


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
