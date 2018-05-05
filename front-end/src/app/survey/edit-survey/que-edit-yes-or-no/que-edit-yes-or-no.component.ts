import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-edit-yes-or-no',
  templateUrl: './que-edit-yes-or-no.component.html',
  styleUrls: ['./que-edit-yes-or-no.component.css']
})
export class QueEditYesOrNoComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  constructor() { }

  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

}
