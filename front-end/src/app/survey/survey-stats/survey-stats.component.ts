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
  public donutChartData1=[];
  public colors=["red","green","blue","yellow","pink"];

  public donutChartData = [{
    id: 0,
    label: 'water',
    value: 2,
    color: 'red',
  }, {
    id: 1,
    label: 'land',
    value: 2,
    color: 'blue',
  }, {
    id: 2,
    label: 'sand',
    value: 3,
    color: 'green',
  }, {
    id: 3,
    label: 'grass',
    value: 2,
    color: 'yellow',
  }, {
    id: 4,
    label: 'earth',
    value: 1,
    color: 'pink',
  }];

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
          console.log(response);

          console.log(response.questions);
          for(let i of response.questions)
          {
            i.distribution.forEach((item, index) => {
              //console.log(item); // 9, 2, 5
              //console.log(index); // 0, 1, 2
              item["id"]=index;
              item["label"]=item.choice;
              item["value"]=item.count;
              item["color"]=this.colors[index];
            });
            console.log(i.distribution);
          }
          this.stats = response;
          this.surveyStats = response.questions;
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
