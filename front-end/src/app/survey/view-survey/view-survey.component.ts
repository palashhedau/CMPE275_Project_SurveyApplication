import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  public id: string;
  public surveyData: any;
  public errorMessage= '';
  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    console.log("View call hua re")
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getViewSurvey();
      }
    );
  }

  getViewSurvey() {
    this.errorMessage = ''
    this.surveyService.viewSurvey(this.id).subscribe(
      (response) => {
        console.log(typeof response);
        if(typeof response === 'object' && response.code === 404){
          this.router.navigate(['/not-found']);
        }else{
          console.log(response);
          this.surveyData = response;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  unpublish(){
    this.errorMessage = ''
    const _this = this;
    this.surveyService.unpublish(this.id).subscribe(
      (response) => {
        if(response.code === 200){
          _this.getViewSurvey();
        }else{
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Error Occured while unpublishing the survey';
      }
    )
  }

  closeSurvey(){
    const _this = this;
    this.surveyService.closeSurvey(this.id).subscribe(
      (response) => {
        if(response.code === 200){
          _this.getViewSurvey();
        }else{
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Error occured while closing the survey';
      }
    )
  }
}
