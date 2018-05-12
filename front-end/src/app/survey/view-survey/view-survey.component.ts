import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {NgModel} from '@angular/forms';
import {GetSurveyResponseParams} from '../take-survey/get-survey-response-params.model';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  public id: string;
  public surveyData: any;
  public errorMessage= '';
  @ViewChild('endDate') endDate: NgModel;
  public date: any;

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getViewSurvey();
      }
    );
  }

  extend(){

    this.errorMessage = '';
    if(this.endDate.value === '' ){
      this.errorMessage = 'Please enter proper date';
      return;
    }

    this.surveyService.extendEndDate(this.id, this.endDate.value).subscribe(
      (response : ResponseParam) => {
        if(response.code){
          this.errorMessage = response.message;
          setTimeout(()=> {
            this.errorMessage = ''
          },3000);
        }
      },
      (error) => {

      }
    );

  }


  getViewSurvey() {
    this.errorMessage = ''
    this.surveyService.viewSurvey(this.id).subscribe(
      (response: GetSurveyResponseParams) => {
        console.log(response);
        if(typeof response === 'object' && response.code === 404){
          this.router.navigate(['/not-found']);
        }else{
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
      (response: ResponseParam) => {
        if(response.code === 200){
          _this.getViewSurvey();
        }else{
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Error Occured while unpublishing the survey';
      }
    );
  }




  publish(){
    this.errorMessage = ''
    const _this = this;
    this.surveyService.publishSurvey(this.id).subscribe(
      (response: ResponseParam) => {
        if(response.code === 200){
          _this.getViewSurvey();
        }else{
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Error Occured while Publishing the survey';
      }
    );
  }



  closeSurvey(){
    const _this = this;
    this.surveyService.closeSurvey(this.id).subscribe(
      (response: ResponseParam) => {
        if(response.code === 200){
          _this.getViewSurvey();
        }else{
          _this.errorMessage = response.message;
        }
      },
      (error) => {
        _this.errorMessage = 'Error occured while closing the survey';
      }
    );
  }



}
