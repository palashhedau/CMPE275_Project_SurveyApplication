import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-que-datetime',
  templateUrl: './que-datetime.component.html',
  styleUrls: ['./que-datetime.component.css']
})
export class QueDatetimeComponent implements OnInit {
  @Input('question') question: string;
  @Output('deleteQuestion') delete = new EventEmitter<{id: string}>()
  @Input('id') id: string;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
  }

  deleteQuestion(){
    this.delete.emit({id : this.id});
  }


}
