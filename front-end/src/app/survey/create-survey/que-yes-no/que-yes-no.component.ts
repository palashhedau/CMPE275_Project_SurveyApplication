import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-que-yes-no',
  templateUrl: './que-yes-no.component.html',
  styleUrls: ['./que-yes-no.component.css']
})
export class QueYesNoComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()

  deleteQuestion(){
    console.log("ye hora h delet")
    this.delete.emit({id : this.id});
  }

  constructor() { }

  ngOnInit() {
  }

}
