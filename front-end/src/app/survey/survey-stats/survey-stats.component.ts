import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {GetSurveyResponseParams} from '../take-survey/get-survey-response-params.model';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['./survey-stats.component.css']
})
export class SurveyStatsComponent implements OnInit {
  public id: string;
  public stats = {};
  public surveyStats = [];
  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getStats();
      }
    );
  }


  getStats(){
    this.surveyService.getStats(this.id).subscribe(
      (response : GetSurveyResponseParams) => {
        if(response.code === undefined){
          this.stats = response;
          this.surveyStats = response.questions;
        } else {
          this.router.navigate(['/not-found'])
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
