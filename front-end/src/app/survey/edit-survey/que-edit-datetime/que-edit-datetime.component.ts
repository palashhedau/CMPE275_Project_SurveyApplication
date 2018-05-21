import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-edit-datetime',
  templateUrl: './que-edit-datetime.component.html',
  styleUrls: ['./que-edit-datetime.component.css']
})
export class QueEditDatetimeComponent implements OnInit {
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
    console.log(this.question)
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


}
