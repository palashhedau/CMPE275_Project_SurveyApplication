import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {ResponseParam} from '../../ResponseParam.model';
import {NgModel} from '@angular/forms';
import {GetSurveyResponseParams} from '../take-survey/get-survey-response-params.model';
import {SnotifyService} from 'ng-snotify';

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
              private router: Router,
              private snotifyService: SnotifyService) { }

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
      this.showNotification('Error', 'Please enter proper date');
      return;
    }

    this.surveyService.extendEndDate(this.id, this.endDate.value).subscribe(
      (response : ResponseParam) => {
        console.log(response)
        if(response.code === 200){
          this.showNotification('Success', response.message);
        }else{
          this.showNotification('Error', response.message);
        }
      },
      (error) => {
        this.showNotification('Error', 'Error occured');
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
        } else {
          this.surveyData = response;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  unpublish(){
    this.errorMessage = '';
    this.surveyService.unpublish(this.id).subscribe(
      (response: ResponseParam) => {
        if(response.code === 200){
          this.showNotification('Success','Survey unpublished successfully');
          this.getViewSurvey();
        } else {
          this.showNotification('Success',response.message);
        }
      },
      (error) =>{
        this.showNotification('Success','Error Occured while unpublishing the survey');
      }
    );
  }




  publish(){
    this.errorMessage = ''
    this.surveyService.publishSurvey(this.id).subscribe(
      (response: ResponseParam) => {
        if(response.code === 200){
          this.getViewSurvey();
          this.showNotification('Success','Survey published successfully');
        } else {
          this.showNotification('Error',response.message)
        }
      },
      (error) => {
        this.showNotification('Error', 'Error Occured while Publishing the surveyError Occured while Publishing the survey');
      }
    );
  }



  closeSurvey(){

    this.surveyService.closeSurvey(this.id).subscribe(
      (response: ResponseParam) => {
        if(response.code === 200){
          this.getViewSurvey();
          this.showNotification('Success','Survey Closed successfully');
        }else{
          this.showNotification('Error',response.message);
        }
      },
      (error) => {
        this.showNotification('Error','Error occured while closing the survey');
      }
    );
  }


  showNotification(type: string, body: string){
    switch (type){
      case  'Success' :
        this.snotifyService.success(body, 'Status', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break ;
      case  'Error' :
        this.snotifyService.error(body, 'Status', {
          timeout: 4000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true
        });
        break;
    }
  }

}
