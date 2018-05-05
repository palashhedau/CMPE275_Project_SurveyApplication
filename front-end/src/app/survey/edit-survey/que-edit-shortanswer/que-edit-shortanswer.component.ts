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
  constructor() { }

  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

}
