import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../../survey-service.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input('question') question: any;
  @Input() id: string;
  public ratings: number[];
  @ViewChild('answerChoice') answerChoice : ngModel;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
      if(this.question.choice[0]['answers'].trim() === '1-10 Stars'){
        this.ratings = Array.from({length: 10}, (v, k) => k+1);
      } else {
        this.ratings = Array.from({length: 5}, (v, k) => k+1);
      }
  }


  selectAnswer(){
    this.surveyService.setChoice(this.question.id , this.answerChoice.value, this.question.questionType);
  }
}
