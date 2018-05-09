import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  public ratings: number;
  public answer: string;


  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
      if(this.question.choice[0]['answers'].trim() === '1-10 Stars'){
        this.ratings = 10;
      } else {
        this.ratings = 5;
      }

      if(this.question.surveySubmitResponseAnswers.length > 0){
        this.answer = this.question.surveySubmitResponseAnswers[0]['answer'];
      }
  }

  onRatingClicked(element:any){
    this.surveyService.setChoice(this.question.id , element , this.question.questionType);
  }
}
