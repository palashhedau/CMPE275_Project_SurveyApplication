import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {AuthService} from '../../landing/auth.service';

@Component({
  selector: 'app-survey-attempted',
  templateUrl: './survey-attempted.component.html',
  styleUrls: ['./survey-attempted.component.css']
})
export class SurveyAttemptedComponent implements OnInit {
  public id: string;
  public errorMessage: string;
  public surveyList = [];
  public email: string;
  constructor(private currentRoute : ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

    this.surveyService.getAttemptedSurvey(this.id).subscribe(
      (response : any) => {
        if(response.code === undefined){
          console.log(response)
          this.email = this.authService.email
          this.surveyList = response;
        }
        this.errorMessage = response.message;
      },
      (error) => {
        this.errorMessage = 'Error occured while fetching the data';
      }
    );

  }

}
