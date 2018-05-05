import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-edit-datetime',
  templateUrl: './que-edit-datetime.component.html',
  styleUrls: ['./que-edit-datetime.component.css']
})
export class QueEditDatetimeComponent implements OnInit {
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
