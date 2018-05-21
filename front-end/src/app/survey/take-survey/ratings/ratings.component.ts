import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';
import {NgModel} from '@angular/forms';
import { NeutronRatingModule } from 'neutron-star-rating';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  @Input() email: string;
  @Output('showNotification') showNotification = new EventEmitter<{type: string, body: string}>();
  public answer = 0;


  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
      if(this.question.surveySubmitResponseAnswers.length > 0){
        this.answer = this.question.surveySubmitResponseAnswers[0]['answer'];
      }
  }

  onRatingClicked(element:any){
    this.surveyService.setChoice(this.question.id , element , this.question.questionType, this.email);
    this.showNotification.emit({type : 'Success' , body : 'Option saved Successfully'});
  }
}
