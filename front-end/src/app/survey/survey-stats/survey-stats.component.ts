import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['./survey-stats.component.css']
})
export class SurveyStatsComponent implements OnInit {
  public id: string;
  public stats = {};
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
      (response) => {
        if(response.code === undefined){
          this.stats = response;
        }else{
          this.router.navigate(['/not-found'])
        }
        console.log(this.stats)
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
