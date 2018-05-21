import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-view-attempted-surveys',
  templateUrl: './view-attempted-surveys.component.html',
  styleUrls: ['./view-attempted-surveys.component.css']
})
export class ViewAttemptedSurveysComponent implements OnInit {
  public id: string;
  public errorMessage: string;
  public questionList = [];
  public infoId : string;

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private router : Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.infoId = this.currentRoute.snapshot.params['info-id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.infoId = params['info-id']
        this.getMyResponse();
      }
    );
  }

  getMyResponse(){
    this.surveyService.viewMyResponse(this.id, this.infoId).subscribe(
      (response: any) => {
            if(response.code === undefined){
              console.log(response)
              this.questionList = response;
            }else{
              this.router.navigate(['/not-found']);
            }
          },
      (error) => {
          this.errorMessage = 'Error occured while getting the survey response';
      }
    );
  }

}
