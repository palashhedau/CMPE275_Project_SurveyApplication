import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-que-edit-star-rating',
  templateUrl: './que-edit-star-rating.component.html',
  styleUrls: ['./que-edit-star-rating.component.css']
})
export class QueEditStarRatingComponent implements OnInit {
  @Input('question') question: string;
  @Input('id') id: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  constructor() { }

  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }

  constructor() { }

  saveChoices(element: NgModel) {
    console.log("Palash3", element.value);
    this.saveRatingsChoice.emit({choice: element.value , sequence: this.id});
  }


}
