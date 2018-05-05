import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyService} from '../survey-service.service';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  @ViewChild('questionType')questionType: NgModel;
  @ViewChild('question')question: NgModel;
  category: string;
  date: string;
  formName: string;

  public id: string;
  public data: any = {};
  public defaultQuestionChoice = '';
  public errorMessage = '';

  public questionList: any = [];

  constructor(private currentRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private route: Router) { }

  ngOnInit() {
    this.id = this.currentRoute.snapshot.params['id'];
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getSurveyToEdit();
      }
    );
  }

  getSurveyToEdit(){
    const _this = this;
    this.surveyService.getSurveyToEdit(this.id).subscribe(
      (response) => {
        if(response.code === 'undefined'){
          this.route.navigate(['/not-found']);
        }else{
          console.log(response);
          _this.category = response.category;
          _this.formName = response.name;
          _this.date = response.endTime;
          _this.questionList = response.questions;
          _this.data = response;

        }
      },
      (error) => {
        console.log('error');
      }
    );
  }

  addQuestion(){

  }

  createSurvey(status: string){

  }

  deleteQuestion(data: {id: string}){
  /*  this.questionList.splice(parseInt(data.id,10), 1);
    this.surveyService.deleteQuestion(parseInt(data.id,10));
  */}

  saveChoice(data: {choice: string, sequence: number , id: string}){

  }
}
